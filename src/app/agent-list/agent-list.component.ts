import { Component, OnInit } from "@angular/core";
import { BackendService } from "../_shared/backend.service";
import { ChatMessage } from "../_interfaces/chat.message";
import { FormControl } from "@angular/forms";
import { ServerConnection } from "jema";

@Component({
  selector: "app-agent-list",
  templateUrl: "./agent-list.component.html",
  styleUrls: ["./agent-list.component.scss"],
})
export class AgentListComponent implements OnInit {
  result: any;
  chatMessage: ChatMessage;
  bus: ServerConnection;
  visibleRowIndex: number = null;
  receivedMessage: any;
  // receivedTo: any;
  receivedFromAgent: any;
  receivedFrom: any;
  receivedDate: any;
  today: any;
  group: any;

  message = new FormControl("", [
    // Validators.required
  ]);

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    // this.receivedDate = new Date();
    this.chatMessage = new ChatMessage();
    this.bus.getAgents().subscribe((res) => {
      this.result = res;
      this.group = this.result.find((x) => x.teamName);
    });

    this.bus.messageReceived.subscribe((res) => {
      this.receivedFromAgent = res.agent;
      this.receivedFrom = res.from;
      // this.receivedTo = res.to;
      this.receivedDate = res.timestamp;
      this.receivedMessage = res.message;
    });
  }

  sendMessage(agent, group) {
    this.receivedMessage = null;
    this.receivedFrom = null;
    this.today = new Date().toLocaleTimeString();
    this.chatMessage.to = agent !== null ? agent.name : group.teamName;
    this.chatMessage.message = this.message.value;
    this.chatMessage.timestamp = this.today;
    if (agent) {
      this.bus.sendChatMessage(this.chatMessage);
    }
    if (group) {
      this.bus.sendGroupChatMessage(this.chatMessage);
    }
    this.message.reset();
  }
}
