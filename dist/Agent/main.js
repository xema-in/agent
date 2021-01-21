(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\vasu\source\repos\agent.github\src\main.ts */"zUnb");


/***/ }),

/***/ "43XP":
/*!********************************************************************!*\
  !*** ./src/app/_components/agent-status/agent-status.component.ts ***!
  \********************************************************************/
/*! exports provided: AgentStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentStatusComponent", function() { return AgentStatusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_shared/shared-data.service */ "zh9A");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");






function AgentStatusComponent_div_77_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AgentStatusComponent_mat_chip_list_79_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-chip-list", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-chip", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const crm_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", crm_r2.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", crm_r2.name, " ");
} }
class AgentStatusComponent {
    constructor(service, recentCall) {
        this.service = service;
        this.recentCall = recentCall;
        this.cdate = new Date();
        this.queueUpdates = [];
        this.nodata = true;
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.bus.queueUpdates.subscribe((queueUpdates) => {
            this.queueUpdates = queueUpdates;
        });
        this.bus.task.subscribe((task) => {
            if (task === null || task === undefined) {
                this.taskAssigned = false;
                this.ahtTarget = null;
                clearInterval(this.interval);
                this.currentprogress = 0;
                this.completed = null;
            }
            else {
                this.taskAssigned = true;
            }
            this.task = task;
            this.crms = [];
            this.nodata = true;
            if (this.task &&
                this.task.queue &&
                this.task.queue.crms &&
                this.task.queue.crms.length > 0) {
                this.crms = this.task.queue.crms;
                this.nodata = false;
            }
            if (this.task && this.task.call.attributes.destconnectedlinenum) {
                if (this.task.call.attributes.destconnectedlinenum.startsWith("+91")) {
                    this.task.call.attributes.destconnectedlinenum = this.task.call.attributes.destconnectedlinenum.substring(3);
                }
                clearInterval(this.interval);
                if (this.task.queue.baseQueueOptions.ahtTarget) {
                    this.ahtTarget = this.task.queue.baseQueueOptions.ahtTarget;
                    this.currentprogress = 0;
                    this.startTimer();
                }
            }
        });
        this.bus.agentInfo.subscribe((res) => {
            this.info = res;
        });
        this.bus.phoneState.subscribe((state) => {
            this.phoneState = state;
            switch (this.phoneState.state) {
                case "Unknown":
                    clearInterval(this.interval);
                    break;
                case "INUSE":
                    break;
                case "Not in use":
                    clearInterval(this.interval);
                case "NOT_INUSE":
                    clearInterval(this.interval);
                    break;
                default:
                    break;
            }
        });
    }
    GetDuration(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);
        const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " min " : " min ") : "";
        const sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";
        return hDisplay + mDisplay + sDisplay;
    }
    startTimer() {
        this.interval = setInterval(() => {
            this.currentprogress += 1;
            this.completed = (this.currentprogress / this.ahtTarget) * 100;
            this.color = "green";
            if (this.currentprogress > this.ahtTarget) {
                this.color = "red";
                // clearInterval(this.interval);
            }
        }, 1000);
    }
}
AgentStatusComponent.ɵfac = function AgentStatusComponent_Factory(t) { return new (t || AgentStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_2__["SharedDataService"])); };
AgentStatusComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AgentStatusComponent, selectors: [["app-agent-status"]], decls: 80, vars: 22, consts: [[1, "row"], [1, "col-sm-3"], [1, "card", "border-info"], [1, "card-header", "bg-info", "text-white"], [1, "material-icons", "pull-right", 2, "font-size", "28px"], [1, "card-body"], [1, "clearfix"], [1, "card-text", "float-left", "text-secondary"], [1, "text-right", "float-right"], [1, "card", "border-danger"], [1, "card-header", "bg-danger", "text-white"], [1, "progress"], ["role", "progressbar", "aria-valuenow", "currentprogress", "aria-valuemin", "0", "aria-valuemax", "100"], [2, "font-size", "15px"], [1, "card", "border-success"], [1, "card-header", "bg-success", "text-white"], [1, "card", "border-secondary"], [1, "card-header", "bg-secondary", "text-white"], ["class", "col-md-4 pl-5 text-center", 4, "ngIf"], ["class", "mat-chip-list-stacked", 4, "ngFor", "ngForOf"], [1, "col-md-4", "pl-5", "text-center"], ["src", "assets/nodata.png", "alt", "Xema", 2, "height", "120px"], [1, "mat-chip-list-stacked"], ["target", "_blank", 3, "href"], ["selected", ""]], template: function AgentStatusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Agent Info ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "perm_identity");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Name :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "EmpId :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " First LogIn : ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](23, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Live Call Info ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "hourglass_empty");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Start Time :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](36, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "AHT Target :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Call Details ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "phone");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " Campaign :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, " Cli :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Call Number :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "CRM's ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](77, AgentStatusComponent_div_77_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](79, AgentStatusComponent_mat_chip_list_79_Template, 4, 2, "mat-chip-list", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.info == null ? null : ctx.info.agentInfo.agentName, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.info == null ? null : ctx.info.agentInfo.userId, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](23, 16, ctx.info == null ? null : ctx.info.agentInfo.firstLogin, "mediumTime"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](36, 19, ctx.task == null ? null : ctx.task.call.dateReceived, "mediumTime"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.GetDuration(ctx.ahtTarget));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("progress-bar ", ctx.color, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.completed, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.GetDuration(ctx.currentprogress), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.task == null ? null : ctx.task.call.queue, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.task == null ? null : ctx.task.call.attributes.destconnectedlinenum, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.task == null ? null : ctx.task.call.attributes.linkedid, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.nodata);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.crms);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_4__["MatChipList"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_4__["MatChip"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]], styles: ["@media (min-width: 576px) {\r\n  [_ngcontent-%COMP%]:root {\r\n    --size-divisor: 2;\r\n  }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  [_ngcontent-%COMP%]:root {\r\n    --size-divisor: 1.5;\r\n  }\r\n}\r\n\r\n@media (min-width: 992px) {\r\n  [_ngcontent-%COMP%]:root {\r\n    --size-divisor: 1;\r\n  }\r\n}\r\n\r\n@media (min-width: 1200px) {\r\n  [_ngcontent-%COMP%]:root {\r\n    --size-divisor: 0.67;\r\n  }\r\n}\r\n\r\n.bg-danger[_ngcontent-%COMP%] {\r\n  background-color: #dc6a74 !important;\r\n}\r\n\r\n.border-danger[_ngcontent-%COMP%] {\r\n  border-color: #c5858a !important;\r\n}\r\n\r\n.bg-success[_ngcontent-%COMP%] {\r\n  background-color: #62af73 !important;\r\n}\r\n\r\n.border-success[_ngcontent-%COMP%] {\r\n  border-color: #78b185 !important;\r\n}\r\n\r\n.bg-secondary[_ngcontent-%COMP%] {\r\n  background-color: #8594a0 !important;\r\n}\r\n\r\n.border-secondary[_ngcontent-%COMP%] {\r\n  border-color: #8594a0 !important;\r\n}\r\n\r\n.bg-info[_ngcontent-%COMP%] {\r\n  background-color: #3198a9 !important;\r\n}\r\n\r\n.border-info[_ngcontent-%COMP%] {\r\n  border-color: #3198a9 !important;\r\n}\r\n\r\nmat-chip[_ngcontent-%COMP%] {\r\n  max-width: 400px;\r\n}\r\n\r\n.progress[_ngcontent-%COMP%] {\r\n  margin: 10px;\r\n  width: calc(350px / var(--size-divisor));\r\n  height: 26px;\r\n}\r\n\r\n.green[_ngcontent-%COMP%] {\r\n  background-color: #28a745 !important;\r\n}\r\n\r\n.red[_ngcontent-%COMP%] {\r\n  background-color: #dc3545 !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LXN0YXR1cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsbUJBQW1CO0VBQ3JCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGlCQUFpQjtFQUNuQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxvQkFBb0I7RUFDdEI7QUFDRjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWix3Q0FBd0M7RUFDeEMsWUFBWTtBQUNkOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDIiwiZmlsZSI6ImFnZW50LXN0YXR1cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XHJcbiAgOnJvb3Qge1xyXG4gICAgLS1zaXplLWRpdmlzb3I6IDI7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICA6cm9vdCB7XHJcbiAgICAtLXNpemUtZGl2aXNvcjogMS41O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XHJcbiAgOnJvb3Qge1xyXG4gICAgLS1zaXplLWRpdmlzb3I6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XHJcbiAgOnJvb3Qge1xyXG4gICAgLS1zaXplLWRpdmlzb3I6IDAuNjc7XHJcbiAgfVxyXG59XHJcblxyXG4uYmctZGFuZ2VyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGM2YTc0ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5ib3JkZXItZGFuZ2VyIHtcclxuICBib3JkZXItY29sb3I6ICNjNTg1OGEgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJnLXN1Y2Nlc3Mge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2MmFmNzMgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJvcmRlci1zdWNjZXNzIHtcclxuICBib3JkZXItY29sb3I6ICM3OGIxODUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJnLXNlY29uZGFyeSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg1OTRhMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uYm9yZGVyLXNlY29uZGFyeSB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjODU5NGEwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5iZy1pbmZvIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzE5OGE5ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5ib3JkZXItaW5mbyB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMzE5OGE5ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbm1hdC1jaGlwIHtcclxuICBtYXgtd2lkdGg6IDQwMHB4O1xyXG59XHJcblxyXG4ucHJvZ3Jlc3Mge1xyXG4gIG1hcmdpbjogMTBweDtcclxuICB3aWR0aDogY2FsYygzNTBweCAvIHZhcigtLXNpemUtZGl2aXNvcikpO1xyXG4gIGhlaWdodDogMjZweDtcclxufVxyXG5cclxuLmdyZWVuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhhNzQ1ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5yZWQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDUgIWltcG9ydGFudDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AgentStatusComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-agent-status",
                templateUrl: "./agent-status.component.html",
                styleUrls: ["./agent-status.component.css"],
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }, { type: src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_2__["SharedDataService"] }]; }, null); })();


/***/ }),

/***/ "6C6p":
/*!*******************************************!*\
  !*** ./src/app/_code/custom-formatter.ts ***!
  \*******************************************/
/*! exports provided: CustomFormatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomFormatter", function() { return CustomFormatter; });
class CustomFormatter {
    format(then) {
        const now = Date.now();
        let totalUnits = Math.round(Math.abs(now - then) / 1000);
        const seconds = totalUnits % 60;
        totalUnits -= seconds;
        totalUnits /= 60;
        const minutes = totalUnits % 60;
        totalUnits -= minutes;
        totalUnits /= 60;
        let str = '';
        if (totalUnits > 0) {
            str += totalUnits + 'h ';
        }
        if (minutes > 0) {
            str += minutes + 'm ';
        }
        if (seconds > 0) {
            str += seconds + 's ';
        }
        return str;
    }
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    backend: ''
    // backend: 'http://manager.xema.in:8080' // manager.xema.in
    // backend: 'http://192.168.29.60'
    // backend: 'http://172.23.179.133' // test
    // backend: 'http://172.23.179.157' // production
    // backend: 'http://223.196.176.248:8080' // production
    // backend: 'http://223.196.176.248:8081' // test
    // backend: 'https://localhost:44394'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "B+Mi":
/*!****************************************!*\
  !*** ./src/app/app-material.module.ts ***!
  \****************************************/
/*! exports provided: AppMaterialComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMaterialComponentsModule", function() { return AppMaterialComponentsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");























class AppMaterialComponentsModule {
}
AppMaterialComponentsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppMaterialComponentsModule });
AppMaterialComponentsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppMaterialComponentsModule_Factory(t) { return new (t || AppMaterialComponentsModule)(); }, imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_12__["MatTableModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__["MatSortModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_20__["MatNativeDateModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_18__["MatBadgeModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__["MatIconModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__["MatGridListModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_17__["MatSelectModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__["MatProgressBarModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__["MatChipsModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppMaterialComponentsModule, { exports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_12__["MatTableModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__["MatSortModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_20__["MatNativeDateModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_18__["MatBadgeModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__["MatIconModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__["MatGridListModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_17__["MatSelectModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__["MatProgressBarModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__["MatChipsModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppMaterialComponentsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                exports: [
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_12__["MatTableModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__["MatSortModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_20__["MatNativeDateModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                    _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_18__["MatBadgeModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__["MatIconModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__["MatGridListModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_17__["MatSelectModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__["MatProgressBarModule"],
                    _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__["MatChipsModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "BJsK":
/*!************************************************************************!*\
  !*** ./src/app/_call/disposition-tools/disposition-tools.component.ts ***!
  \************************************************************************/
/*! exports provided: MyErrorStateMatcher, DispositionToolsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyErrorStateMatcher", function() { return MyErrorStateMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DispositionToolsComponent", function() { return DispositionToolsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/shared-data.service */ "zh9A");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");









function DispositionToolsComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DispositionToolsComponent_div_0_div_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.callBack(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Call Back");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DispositionToolsComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DispositionToolsComponent_div_0_div_3_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r8.endCall(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "End Call");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DispositionToolsComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DispositionToolsComponent_div_0_div_4_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r10.call(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r3.number);
} }
function DispositionToolsComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DispositionToolsComponent_div_0_div_5_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r12.conference(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Merge ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "call_merge");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return { "pointer-events": a0 }; };
function DispositionToolsComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DispositionToolsComponent_div_0_div_6_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.dispose(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Dispose");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r5.disable ? "none" : ""));
} }
function DispositionToolsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DispositionToolsComponent_div_0_div_2_Template, 3, 0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DispositionToolsComponent_div_0_div_3_Template, 3, 0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, DispositionToolsComponent_div_0_div_4_Template, 7, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, DispositionToolsComponent_div_0_div_5_Template, 5, 0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, DispositionToolsComponent_div_0_div_6_Template, 3, 3, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.callerOnline && ctx_r0.isCallBack && ctx_r0.task.queue.baseQueueOptions.allowCallback);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isEndCall && ctx_r0.task.queue.baseQueueOptions.allowEndCall);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.task.queue.baseQueueOptions.allowNewCall);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.task.queue.baseQueueOptions.allowConference && ctx_r0.parked === "Parked");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.callerOnline && ctx_r0.parked !== "Parked");
} }
class MyErrorStateMatcher {
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted));
    }
}
class DispositionToolsComponent {
    constructor(service, shared, dialog, recentCall) {
        this.service = service;
        this.shared = shared;
        this.dialog = dialog;
        this.recentCall = recentCall;
        this.cdate = new Date();
        this.number = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [
        // Validators.required
        ]);
        this.matcher = new MyErrorStateMatcher();
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.disable = false;
        this.bus.task.subscribe((task) => {
            if (task === null || task === undefined) {
                this.taskAssigned = false;
            }
            else {
                this.taskAssigned = true;
                this.disable = false;
            }
            this.task = task;
            if (this.task && this.task.queue.baseQueueOptions.allowEndCall) {
                this.isEndCall = true;
            }
            if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
                this.isCallBack = true;
            }
        });
        this.bus.ongoingCalls.subscribe((list) => {
            this.ongoingCallsList = list;
            if (this.task !== null && this.task !== undefined) {
                if (list.find((x) => x.cli === this.task.call.attributes.calleridnum)) {
                    this.callerOnline = true;
                }
                else {
                    this.callerOnline = false;
                    // this.autoDispose();
                }
            }
        });
        this.bus.parkedChannels.subscribe((list) => {
            this.parkedCallsList = list;
            this.parked =
                this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
        });
        this.bus.task.subscribe((queueCall) => {
            this.queueCall = queueCall;
            if (this.queueCall &&
                this.queueCall.queue &&
                this.queueCall.queue.crms &&
                this.queueCall.queue.crms.length > 0) {
                this.openNewtab();
            }
        });
        this.bus.phoneState.subscribe((state) => {
            this.phoneState = state;
            switch (this.phoneState.state) {
                case "Unknown":
                    if (this.task && this.task.queue.baseQueueOptions.allowEndCall) {
                        this.isEndCall = false;
                    }
                    if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
                        this.isCallBack = true;
                    }
                    break;
                case "INUSE":
                    if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
                        this.isCallBack = false;
                    }
                    break;
                case "Not in use":
                case "NOT_INUSE":
                    if (this.task && this.task.queue.baseQueueOptions.allowEndCall) {
                        this.isEndCall = false;
                    }
                    if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
                        this.isCallBack = true;
                    }
                    break;
                default:
                    break;
            }
        });
    }
    openNewtab() {
        this.queueCall.queue.crms.forEach((item, index) => {
            window.open(item.url, index);
        });
    }
    callBack() {
        if (this.task.queue.baseQueueOptions.allowEndCall) {
            this.isEndCall = true;
        }
        this.bus.call(this.task.queue.baseQueueOptions.callbackTrunkName, this.task.call.attributes.calleridnum, this.task.call.attributes.linkedid);
    }
    endCall() {
        // find all channels in ConfBridge & hangup
        if (this.ongoingCallsList.length !== 0) {
            this.ongoingCallsList.forEach((channel) => {
                const localchannel = channel.localChannel;
                const rmchannels = channel.remoteChannel.split(",");
                const removeconf = rmchannels.shift();
                rmchannels.push(localchannel);
                if (rmchannels) {
                    rmchannels.forEach((ch) => {
                        this.bus.hangupCall(ch);
                    });
                }
            });
            this.isEndCall = false;
            this.isCallBack = true;
        }
        // check if the original call is active
        if (this.ongoingCallsList.find((x) => x.remoteChannel === this.task.call.channel)) {
            this.bus.hangupCall(this.task.call.channel);
        }
        else {
            // find the channel and disconnect
            const ch = this.ongoingCallsList.find((x) => x.cli === this.task.call.attributes.calleridnum);
            if (ch !== undefined) {
                this.bus.hangupCall(ch.remoteChannel);
            }
        }
        this.parked = "";
    }
    call() {
        if (this.task.queue.baseQueueOptions.allowEndCall) {
            this.isEndCall = true;
        }
        this.bus.call(this.task.queue.baseQueueOptions.callbackTrunkName, this.number.value, this.task.call.attributes.linkedid);
        this.parked =
            this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
    }
    conference() {
        this.ongoingCallsList.forEach((otherCall) => {
            this.bus.hold(otherCall.remoteChannel);
        });
        const listActive = this.ongoingCallsList.map((x) => x.remoteChannel);
        const listParked = this.parkedCallsList.map((x) => x.channel);
        const total = listActive.concat(listParked);
        this.bus.conference(total);
        this.parked =
            this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
    }
    dispose() {
        this.bus.dispose();
        this.disable = false;
    }
}
DispositionToolsComponent.ɵfac = function DispositionToolsComponent_Factory(t) { return new (t || DispositionToolsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"])); };
DispositionToolsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DispositionToolsComponent, selectors: [["app-disposition-tools"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "row", "pl-3"], ["class", "col-sm", 4, "ngIf"], ["class", "row", 4, "ngIf"], [1, "col-sm"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], [1, "row"], ["autocomplete", "off", 1, "col-sm", "input-group"], ["type", "text", "placeholder", "Enter Number", 1, "col-xs", "form-control", 3, "formControl"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-success", 3, "click"], [1, "material-icons", "pull-right"], ["mat-raised-button", "", "color", "link", 2, "background-color", "#ffc107", 3, "click"], [1, "material-icons"], ["mat-raised-button", "", "color", "warn", 3, "ngStyle", "click"]], template: function DispositionToolsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, DispositionToolsComponent_div_0_Template, 7, 5, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.taskAssigned);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgStyle"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkaXNwb3NpdGlvbi10b29scy5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DispositionToolsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-disposition-tools",
                templateUrl: "./disposition-tools.component.html",
                styleUrls: ["./disposition-tools.component.css"],
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"] }, { type: src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }, { type: src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"] }]; }, null); })();


/***/ }),

/***/ "CWdN":
/*!************************************************************!*\
  !*** ./src/app/_call/task-status/task-status.component.ts ***!
  \************************************************************/
/*! exports provided: TaskStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskStatusComponent", function() { return TaskStatusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function TaskStatusComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " \u00A0|\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Q: ", ctx_r0.task.call.queue, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" C: ", ctx_r0.task.call.attributes.calleridnum, "");
} }
class TaskStatusComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.bus.task.subscribe((task) => {
            if (task === null || task === undefined) {
                this.taskAssigned = false;
            }
            else {
                this.taskAssigned = true;
            }
            this.task = task;
        });
    }
}
TaskStatusComponent.ɵfac = function TaskStatusComponent_Factory(t) { return new (t || TaskStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
TaskStatusComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TaskStatusComponent, selectors: [["app-task-status"]], decls: 1, vars: 1, consts: [["class", "btn btn-sm btn-secondary py-2", 4, "ngIf"], [1, "btn", "btn-sm", "btn-secondary", "py-2"], [1, "mat-button-wrapper"]], template: function TaskStatusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TaskStatusComponent_span_0_Template, 6, 2, "span", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.taskAssigned);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TaskStatusComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-task-status',
                templateUrl: './task-status.component.html'
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "F/a1":
/*!**************************************************************!*\
  !*** ./src/app/_call/phone-status/phone-status.component.ts ***!
  \**************************************************************/
/*! exports provided: PhoneStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneStatusComponent", function() { return PhoneStatusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");







class PhoneStatusComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.bus.phoneState.subscribe((state) => {
            this.phoneState = state;
            this.onHook = true;
            switch (this.phoneState.state) {
                case 'Unknown':
                    this.btnColor = 'btn-secondary';
                    break;
                case 'INUSE':
                    this.onHook = false;
                    this.btnColor = 'btn-danger';
                    break;
                case 'Not in use':
                case 'NOT_INUSE':
                    this.btnColor = 'btn-success';
                    break;
                default:
                    this.btnColor = 'btn-success';
                    break;
            }
        });
    }
    unassignPhone() {
        if (!this.onHook) {
            return;
        }
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
            title: 'Are you sure?',
            text: 'This will change the phone you are currently using!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change'
        }).then((result) => {
            if (result.value) {
                this.bus.unassignPhone().subscribe(() => {
                    this.router.navigateByUrl('/phone');
                });
            }
        });
    }
}
PhoneStatusComponent.ɵfac = function PhoneStatusComponent_Factory(t) { return new (t || PhoneStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
PhoneStatusComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PhoneStatusComponent, selectors: [["app-phone-status"]], decls: 8, vars: 2, consts: [[1, "btn", "btn-sm", 3, "ngClass"], [2, "position", "relative", "top", "-5px"], [3, "click"], [2, "position", "relative", "top", "7px"]], template: function PhoneStatusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PhoneStatusComponent_Template_span_click_2_listener() { return ctx.unassignPhone(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "contact_phone");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.btnColor);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.phoneState.device);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"]], styles: [".select[_ngcontent-%COMP%] {\r\n  background: transparent !important;\r\n  border: none;\r\n  color: white;\r\n  outline: none !important\r\n}\r\n\r\n.options[_ngcontent-%COMP%] {\r\n  background: #dc3545 !important;\r\n  border: none !important;\r\n  color: white;\r\n  outline: none !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob25lLXN0YXR1cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0NBQWtDO0VBQ2xDLFlBQVk7RUFDWixZQUFZO0VBQ1o7QUFDRjs7QUFFQTtFQUNFLDhCQUE4QjtFQUM5Qix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLHdCQUF3QjtBQUMxQiIsImZpbGUiOiJwaG9uZS1zdGF0dXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZWxlY3Qge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnRcclxufVxyXG5cclxuLm9wdGlvbnMge1xyXG4gIGJhY2tncm91bmQ6ICNkYzM1NDUgIWltcG9ydGFudDtcclxuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PhoneStatusComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-phone-status',
                templateUrl: './phone-status.component.html',
                styleUrls: ['./phone-status.component.css']
            }]
    }], function () { return [{ type: _shared_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "GEyD":
/*!****************************************************!*\
  !*** ./src/app/mat-dialog/mat-dialog.component.ts ***!
  \****************************************************/
/*! exports provided: MyErrorStateMatcher, MatDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyErrorStateMatcher", function() { return MyErrorStateMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDialogComponent", function() { return MatDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_shared/backend.service */ "NaRD");
/* harmony import */ var _shared_shared_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_shared/shared-data.service */ "zh9A");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");














function MatDialogComponent_mat_option_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const break_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", break_r4.btCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", break_r4.description, " ");
} }
function MatDialogComponent_mat_error_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Break Type is ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MatDialogComponent_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please choose Break Type ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MatDialogComponent_div_15_mat_error_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please enter Reason ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MatDialogComponent_div_15_mat_error_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Reason ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MatDialogComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "textarea", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "      ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatDialogComponent_div_15_mat_error_4_Template, 2, 0, "mat-error", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MatDialogComponent_div_15_mat_error_5_Template, 4, 0, "mat-error", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r3.reason)("errorStateMatcher", ctx_r3.matcher);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.reason.hasError("reason") && !ctx_r3.reason.hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.reason.hasError("required"));
} }
class MyErrorStateMatcher {
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted));
    }
}
class MatDialogComponent {
    constructor(data, dialogRef, service, recentCall) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.service = service;
        this.recentCall = recentCall;
        this.breaktype = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.reason = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.matcher = new MyErrorStateMatcher();
        this.bus = service.getServerConnection();
    }
    onConfirmClick() {
        this.dialogRef.close(true);
    }
    ngOnInit() { }
    onChangeType(event) {
        const breaktype = event;
        if (breaktype !== 0) {
            this.reason.setValue("");
            this.reason.clearValidators();
            this.reason.updateValueAndValidity();
        }
        if (breaktype === 0) {
            this.reason.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.reason.updateValueAndValidity();
        }
    }
    Submit() {
        if ((this.breaktype.value !== 0 && this.breaktype.valid) ||
            (this.breaktype.value === 0 && this.reason.valid)) {
            this.bus.askBreak2(this.breaktype.value, this.reason.value);
            this.onConfirmClick();
        }
    }
}
MatDialogComponent.ɵfac = function MatDialogComponent_Factory(t) { return new (t || MatDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_4__["SharedDataService"])); };
MatDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatDialogComponent, selectors: [["app-mat-dialog"]], decls: 25, vars: 6, consts: [[2, "width", "600px"], ["mat-dialog-content", "", 1, "text-center"], ["autocomplete", "off", 1, "breakForm"], [1, "col-md-12"], [1, "example-full-width", "w-75"], [3, "formControl", "errorStateMatcher", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "col-md-12", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-stroked-button", "", "color", "primary", 3, "mat-dialog-close"], [3, "value"], ["matInput", "", "placeholder", "Give a reason", 3, "formControl", "errorStateMatcher"]], template: function MatDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Select Break Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MatDialogComponent_Template_mat_select_ngModelChange_9_listener($event) { return ctx.onChangeType($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-option");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Select Break Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, MatDialogComponent_mat_option_12_Template, 2, 2, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, MatDialogComponent_mat_error_13_Template, 4, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, MatDialogComponent_mat_error_14_Template, 2, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, MatDialogComponent_div_15_Template, 6, 4, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MatDialogComponent_Template_button_click_18_listener() { return ctx.Submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Request");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Dismiss");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.breaktype)("errorStateMatcher", ctx.matcher);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.data.info.breakTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.breaktype.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.breaktype.hasError("required") && !ctx.breaktype.hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.breaktype.value === 0);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_6__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatOption"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatError"], _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXQtZGlhbG9nLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-mat-dialog",
                templateUrl: "./mat-dialog.component.html",
                styleUrls: ["./mat-dialog.component.css"],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }, { type: _shared_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"] }, { type: _shared_shared_data_service__WEBPACK_IMPORTED_MODULE_4__["SharedDataService"] }]; }, null); })();


/***/ }),

/***/ "KGjn":
/*!********************************************************************!*\
  !*** ./src/app/_components/recent-calls/recent-calls.component.ts ***!
  \********************************************************************/
/*! exports provided: RecentCallsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentCallsComponent", function() { return RecentCallsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/shared-data.service */ "zh9A");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






function RecentCallsComponent_table_9_tr_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const call_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](call_r3.queue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](call_r3.callNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](call_r3.cli);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](9, 5, call_r3.startTime, "medium"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](12, 8, call_r3.endTime, "medium"));
} }
function RecentCallsComponent_table_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tr", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Queue");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Call Number");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Cli");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "StartTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "EndTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, RecentCallsComponent_table_9_tr_19_Template, 13, 11, "tr", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.recentCall.callinfolist);
} }
function RecentCallsComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "No recent calls ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class RecentCallsComponent {
    constructor(service, router, recentCall) {
        this.service = service;
        this.router = router;
        this.recentCall = recentCall;
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
    }
}
RecentCallsComponent.ɵfac = function RecentCallsComponent_Factory(t) { return new (t || RecentCallsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"])); };
RecentCallsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RecentCallsComponent, selectors: [["app-recent-calls"]], decls: 11, vars: 2, consts: [[1, "my-3"], [1, "d-flex", "flex-row"], [1, "p-1"], [1, "material-icons", "text-secondary", 2, "margin-top", "-2px"], [1, "font-weight-normal", "text-secondary"], [1, "table-responsive"], ["class", "table table-bordered table-hover", 4, "ngIf"], ["class", "clearfix", 4, "ngIf"], [1, "table", "table-bordered", "table-hover"], [1, "bg-secondary", "text-white"], [4, "ngFor", "ngForOf"], [1, "clearfix"], [1, "text-secondary", "display-4"]], template: function RecentCallsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "access_time");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h6", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Recent Calls");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, RecentCallsComponent_table_9_Template, 20, 1, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RecentCallsComponent_div_10_Template, 3, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.recentCall.callinfolist == null ? null : ctx.recentCall.callinfolist.length) != 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.recentCall.callinfolist == null ? null : ctx.recentCall.callinfolist.length) == 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]], styles: [".bg-secondary[_ngcontent-%COMP%] {\r\n  background-color: #8594a0!important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY2VudC1jYWxscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUNBQW1DO0FBQ3JDIiwiZmlsZSI6InJlY2VudC1jYWxscy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJnLXNlY29uZGFyeSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg1OTRhMCFpbXBvcnRhbnQ7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RecentCallsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-recent-calls',
                templateUrl: './recent-calls.component.html',
                styleUrls: ['./recent-calls.component.css']
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"] }]; }, null); })();


/***/ }),

/***/ "M0aV":
/*!*******************************************************************!*\
  !*** ./src/app/auth/phone-selection/phone-selection.component.ts ***!
  \*******************************************************************/
/*! exports provided: PhoneSelectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneSelectionComponent", function() { return PhoneSelectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_code/manager-environment */ "b/np");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");













function PhoneSelectionComponent_mat_progress_bar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 8);
} }
function PhoneSelectionComponent_mat_error_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Phone Number is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PhoneSelectionComponent_mat_error_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Special characters are not allowed");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PhoneSelectionComponent_mat_error_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "4 characters max.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class PhoneSelectionComponent {
    constructor(service) {
        this.service = service;
        this.isLoading = false;
        this.hasError = (controlName, errorName) => {
            return this.phoneSelectionForm.controls[controlName].hasError(errorName);
        };
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.disable = false;
        this.manager = src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_3__["ManagerEnvironment"].getBackendUrl();
        this.bus.IsPhoneMapped().subscribe((data) => {
            this.reconnectDevice(data.phone);
        }, () => {
            // console.error(err);
        });
        this.phoneSelectionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            deviceName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('[0-9]*')]),
        });
    }
    mapDevice() {
        this.mapPhone(this.phoneSelectionForm.value);
    }
    reconnectDevice(phone) {
        this.mapPhone({ deviceName: phone });
    }
    mapPhone(param) {
        this.disable = true;
        this.isLoading = true;
        this.bus.mapPhone(param).subscribe((data) => {
            this.isLoading = false;
            this.service.setAppState({ state: 'Ready' });
            if (data.teamLead) {
                console.log('Enabling Team Lead features...');
                this.service.enableTeamLeadFeatures(true);
            }
            this.disable = false;
        }, err => {
            console.error(err);
            this.isLoading = false;
            this.disable = false;
            if (err.response !== undefined) {
                err = err.response;
            }
            if (err.status === 400) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
                    icon: 'error',
                    title: 'Error Activating Phone',
                    text: err.data
                });
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message
                });
            }
        });
    }
}
PhoneSelectionComponent.ɵfac = function PhoneSelectionComponent_Factory(t) { return new (t || PhoneSelectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"])); };
PhoneSelectionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PhoneSelectionComponent, selectors: [["app-phone-selection"]], decls: 25, vars: 7, consts: [["autocomplete", "off", 3, "formGroup", "ngSubmit"], ["mode", "indeterminate", 4, "ngIf"], ["mat-card-avatar", "", 1, "agent-image"], [1, "mat-card-subtitle"], ["matInput", "", "type", "text", "placeholder", "Phone Number", "formControlName", "deviceName", "id", "phone"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "disabled"], ["target", "_manager", "mat-button", "", "color", "secondary", 3, "href"], ["mode", "indeterminate"]], template: function PhoneSelectionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function PhoneSelectionComponent_Template_form_ngSubmit_0_listener() { return ctx.mapDevice(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PhoneSelectionComponent_mat_progress_bar_1_Template, 1, 0, "mat-progress-bar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Agent");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Welcome back");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " You logged in successfully.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " We now need the phone number you would be using to receive the calls from queues. Enter the 4 digit extention number you are currently using. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, PhoneSelectionComponent_mat_error_17_Template, 2, 0, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, PhoneSelectionComponent_mat_error_18_Template, 2, 0, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, PhoneSelectionComponent_mat_error_19_Template, 2, 0, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "SUBMIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "MANAGE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.phoneSelectionForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("deviceName", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("deviceName", "pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("deviceName", "maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.phoneSelectionForm.valid || ctx.disable);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", ctx.manager, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatAnchor"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__["MatProgressBar"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatError"]], styles: [".agent-image[_ngcontent-%COMP%] {\r\n  background-image: url('female-agent1.jpg');\r\n  background-size: cover;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob25lLXNlbGVjdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMENBQTBEO0VBQzFELHNCQUFzQjtBQUN4QiIsImZpbGUiOiJwaG9uZS1zZWxlY3Rpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZ2VudC1pbWFnZSB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvZmVtYWxlLWFnZW50MS5qcGcnKTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PhoneSelectionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-phone-selection',
                templateUrl: './phone-selection.component.html',
                styleUrls: ['./phone-selection.component.css']
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"] }]; }, null); })();


/***/ }),

/***/ "NaRD":
/*!********************************************!*\
  !*** ./src/app/_shared/backend.service.ts ***!
  \********************************************/
/*! exports provided: BackendService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendService", function() { return BackendService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var jema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jema */ "KJ4G");
/* harmony import */ var jema__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jema__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");





class BackendService {
    constructor() {
        this.appState = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]({ state: 'Unknown' });
        this.teamLeadFeatures = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
    }
    setAppState(state) {
        this.appState.next(state);
    }
    enableTeamLeadFeatures(flag) {
        this.teamLeadFeatures.next(flag);
    }
    // pingServer(ip) {
    //   return this.remote.get(ip + '/api/Setup/Ping');
    // }
    getToken() {
        return localStorage.getItem('access_token');
    }
    saveToken(token) {
        localStorage.setItem('access_token', token);
    }
    getBackendUrl() {
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].backend !== '') {
            return _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].backend;
        }
        else {
            return localStorage.getItem('backend');
        }
    }
    saveBackendIpAddress(ip) {
        localStorage.setItem('backend', ip);
    }
    getServerConnection() {
        return this.serverConnection;
    }
    setupServerConnection() {
        this.serverConnection = new jema__WEBPACK_IMPORTED_MODULE_2__["ServerConnection"](this.getBackendUrl(), this.getToken());
    }
    connect() {
        this.serverConnection.connect();
    }
}
BackendService.ɵfac = function BackendService_Factory(t) { return new (t || BackendService)(); };
BackendService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BackendService, factory: BackendService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BackendService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "OLlN":
/*!***************************************************!*\
  !*** ./src/app/auth/connect/connect.component.ts ***!
  \***************************************************/
/*! exports provided: ConnectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectComponent", function() { return ConnectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");



class ConnectComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.service.setupServerConnection();
        this.service.getServerConnection().connectionState.subscribe((state) => {
            this.service.setAppState({ state: 'Connected' });
        });
        this.service.connect();
    }
}
ConnectComponent.ɵfac = function ConnectComponent_Factory(t) { return new (t || ConnectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"])); };
ConnectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConnectComponent, selectors: [["app-connect"]], decls: 2, vars: 0, template: function ConnectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " connect works!\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25uZWN0LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConnectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-connect',
                templateUrl: './connect.component.html',
                styleUrls: ['./connect.component.css']
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }]; }, null); })();


/***/ }),

/***/ "QX6l":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_shared/backend.service */ "NaRD");
/* harmony import */ var _shared_shared_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_shared/shared-data.service */ "zh9A");
/* harmony import */ var _components_agent_status_agent_status_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_components/agent-status/agent-status.component */ "43XP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_components/messenger/messenger.component */ "ydJu");
/* harmony import */ var _xema_queue_monitor_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @xema/queue-monitor-panel */ "T4/f");
/* harmony import */ var _xema_team_monitor_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @xema/team-monitor-panel */ "LzZt");









function DashboardComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "xe-queue-monitor-panel", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "xe-team-monitor-panel", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("serverConnection", ctx_r0.serverConnection);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("serverConnection", ctx_r0.serverConnection);
} }
class DashboardComponent {
    constructor(service, recentCall) {
        this.service = service;
        this.recentCall = recentCall;
        this.teamLead = false;
        this.serverConnection = service.getServerConnection();
    }
    ngOnInit() {
        this.service.teamLeadFeatures.subscribe((status) => {
            this.teamLead = status;
        });
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_2__["SharedDataService"])); };
DashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 10, vars: 1, consts: [[1, "row", "mt-5"], [4, "ngIf"], [1, "row"], [1, "col-md-9"], [1, "col-sm-3"], [3, "serverConnection"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-agent-status");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DashboardComponent_div_2_Template, 5, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "app-messenger");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.teamLead);
    } }, directives: [_components_agent_status_agent_status_component__WEBPACK_IMPORTED_MODULE_3__["AgentStatusComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_5__["MessengerComponent"], _xema_queue_monitor_panel__WEBPACK_IMPORTED_MODULE_6__["QueueMonitorPanelComponent"], _xema_team_monitor_panel__WEBPACK_IMPORTED_MODULE_7__["TeamMonitorPanelComponent"]], styles: [".mat-grid-tile[_ngcontent-%COMP%]{\r\n    left: 0px;\r\n    width: calc(((62% - 0.5px) * 1) + 0px) !important;\r\n    margin-top: 0px;\r\n    padding-top: calc(((24% - 0.5px) * 1) + 0px) !important;\r\n}\r\n.pill-bg[_ngcontent-%COMP%]{background: #563d7c !important}\r\n.pill-bg[_ngcontent-%COMP%]:hover{background: #360a79 !important}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksU0FBUztJQUNULGlEQUFpRDtJQUNqRCxlQUFlO0lBQ2YsdURBQXVEO0FBQzNEO0FBQ0EsU0FBUyw4QkFBOEI7QUFDdkMsZUFBZSw4QkFBOEI7QUFHN0M7Ozs7R0FJRyIsImZpbGUiOiJkYXNoYm9hcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtZ3JpZC10aWxle1xyXG4gICAgbGVmdDogMHB4O1xyXG4gICAgd2lkdGg6IGNhbGMoKCg2MiUgLSAwLjVweCkgKiAxKSArIDBweCkgIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgIHBhZGRpbmctdG9wOiBjYWxjKCgoMjQlIC0gMC41cHgpICogMSkgKyAwcHgpICFpbXBvcnRhbnQ7XHJcbn1cclxuLnBpbGwtYmd7YmFja2dyb3VuZDogIzU2M2Q3YyAhaW1wb3J0YW50fVxyXG4ucGlsbC1iZzpob3ZlcntiYWNrZ3JvdW5kOiAjMzYwYTc5ICFpbXBvcnRhbnR9XHJcblxyXG5cclxuLyogXHJcbi5jYXJkLWZvb3RlciBpIHtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG59ICovXHJcblxyXG5cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboard',
                templateUrl: './dashboard.component.html',
                styleUrls: ['./dashboard.component.css']
            }]
    }], function () { return [{ type: _shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }, { type: _shared_shared_data_service__WEBPACK_IMPORTED_MODULE_2__["SharedDataService"] }]; }, null); })();


/***/ }),

/***/ "Re1x":
/*!*********************************************!*\
  !*** ./src/app/_interfaces/chat.message.ts ***!
  \*********************************************/
/*! exports provided: ChatMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatMessage", function() { return ChatMessage; });
class ChatMessage {
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.title = 'Agent';
        this.service.appState.subscribe((state) => {
            switch (state.state) {
                case 'Unknown': {
                    this.router.navigateByUrl('/server');
                    break;
                }
                case 'ServerFound': {
                    this.router.navigateByUrl('/login');
                    break;
                }
                case 'LoggedIn': {
                    this.router.navigateByUrl('/connect');
                    // this.service.connect();
                    break;
                }
                case 'Connected': {
                    this.router.navigateByUrl('/phone');
                    break;
                }
                case 'Ready': {
                    const bus = this.service.getServerConnection();
                    bus.refreshPhoneState();
                    bus.getAgentInfo();
                    this.router.navigateByUrl('/');
                    break;
                }
                default: {
                    console.log('Unhandled App State: ' + state.state);
                    break;
                }
            }
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "W3wt":
/*!************************************************************!*\
  !*** ./src/app/_layout/app-layout/app-layout.component.ts ***!
  \************************************************************/
/*! exports provided: AppLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppLayoutComponent", function() { return AppLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _navigation_nav_topbar_nav_topbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_navigation/nav-topbar/nav-topbar.component */ "rJt7");
/* harmony import */ var _navigation_nav_sidebar_nav_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_navigation/nav-sidebar/nav-sidebar.component */ "fnF2");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");





class AppLayoutComponent {
    constructor() {
        this.showFiller = false;
    }
    ngOnInit() {
        window.addEventListener('beforeunload', function (e) {
            const confirmationMessage = '\o/';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        });
    }
}
AppLayoutComponent.ɵfac = function AppLayoutComponent_Factory(t) { return new (t || AppLayoutComponent)(); };
AppLayoutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppLayoutComponent, selectors: [["app-app-layout"]], decls: 14, vars: 0, consts: [[1, "navbar", "navbar-expand-lg", "navbar-light", "fixed-top", "flex-md-nowrap", "shadow", "py-0"], ["href", "/", 1, "navbar-brand", "col-sm-2", "col-md-1", "mr-0"], ["src", "assets/logo-old.png", "alt", "Xema", "width", "45", 1, "d-block", "mx-auto"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"], [1, "container-fluid"], [1, "row"], [1, "col-md-1", "d-none", "d-md-block", "sidebar"], [1, "sidebar-sticky"], ["role", "main", 1, "col-md-11", "ml-sm-auto", "col-lg-11", "pl-0"], [1, "justify-content-between", "flex-wrap", "flex-md-nowrap", "align-items-center", "pt-3", "pb-2", "mb-3"]], template: function AppLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-nav-topbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nav", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "app-nav-sidebar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "main", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_navigation_nav_topbar_nav_topbar_component__WEBPACK_IMPORTED_MODULE_1__["NavTopbarComponent"], _navigation_nav_sidebar_nav_sidebar_component__WEBPACK_IMPORTED_MODULE_2__["NavSidebarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["body[_ngcontent-%COMP%] {\r\n  font-size: 0.875rem;\r\n}\r\n\r\n.feather[_ngcontent-%COMP%] {\r\n  width: 16px;\r\n  height: 16px;\r\n  vertical-align: text-bottom;\r\n}\r\n\r\n\r\n\r\n.sidebar[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 100;\r\n  \r\n  padding: 48px 0 0;\r\n  \r\n}\r\n\r\n.sidebar-sticky[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  top: 0;\r\n  height: calc(100vh - 48px);\r\n  padding-top: 0.5rem;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n  \r\n}\r\n\r\n@supports (position: sticky) {\r\n  .sidebar-sticky[_ngcontent-%COMP%] {\r\n    position: sticky;\r\n    background: #303641;\r\n    width: 80px;\r\n  }\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n  color: #6d5ed7 !important;\r\n  text-align: center !important;\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .feather[_ngcontent-%COMP%] {\r\n  margin-right: 4px;\r\n  color: #999;\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\r\n  color: #007bff;\r\n}\r\n\r\n.sidebar[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover   .feather[_ngcontent-%COMP%], .sidebar[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%]   .feather[_ngcontent-%COMP%] {\r\n  color: inherit;\r\n}\r\n\r\n.sidebar-heading[_ngcontent-%COMP%] {\r\n  font-size: 0.75rem;\r\n  text-transform: uppercase;\r\n}\r\n\r\n\r\n\r\n[role=\"main\"][_ngcontent-%COMP%] {\r\n  padding-top: 30px;\r\n  \r\n  position: relative;\r\n  \r\n}\r\n\r\n\r\n\r\n.fixed-top[_ngcontent-%COMP%] {\r\n  height: 70px;\r\n  \r\n  padding-top: 10px;\r\n  background-color: #563d7c;\r\n}\r\n\r\n.navbar-brand[_ngcontent-%COMP%] {\r\n  \r\n  position: relative;\r\n  left: -16px;\r\n  max-width: 80px;\r\n  width: 80px;\r\n  height: 70px;\r\n  margin-top: 10px !important;\r\n}\r\n\r\n.navbar[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\r\n  padding: 0.75rem 1rem;\r\n  border-width: 0;\r\n  border-radius: 0;\r\n}\r\n\r\n.form-control-dark[_ngcontent-%COMP%] {\r\n  color: #fff;\r\n  background-color: rgba(255, 255, 255, 0.1);\r\n  border-color: rgba(255, 255, 255, 0.1);\r\n}\r\n\r\n.form-control-dark[_ngcontent-%COMP%]:focus {\r\n  border-color: transparent;\r\n  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n@media screen and (max-width: 1170px) {\r\n  .sidebar-sticky[_ngcontent-%COMP%] {\r\n    width: 85px;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC1sYXlvdXQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2RkFBNkY7O0FBRTdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUE4Qk07O0FBRU4sa0RBQWtEOztBQUVsRDs7O0tBR0s7O0FBRUw7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTs7SUFFSTs7QUFFSjtFQUNFLGVBQWU7RUFDZixNQUFNO0VBQ04sU0FBUztFQUNULE9BQU87RUFDUCxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLDBCQUEwQjtFQUMxQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQiw2REFBNkQ7QUFDL0Q7O0FBRUE7RUFDRTtJQUVFLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsV0FBVztFQUNiO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix5QkFBeUI7QUFDM0I7O0FBRUE7O0lBRUk7O0FBRUo7RUFDRSxpQkFBaUI7RUFDakIsMkJBQTJCO0VBQzNCLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUE7O0lBRUk7O0FBRUo7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRTswQkFDd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7RUFDWiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCwwQ0FBMEM7RUFDMUMsc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLCtDQUErQztBQUNqRDs7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0YiLCJmaWxlIjoiYXBwLWxheW91dC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogT24gc21hbGwgc2NyZWVucywgdGhlIG5hdiBtZW51IHNwYW5zIHRoZSBmdWxsIHdpZHRoIG9mIHRoZSBzY3JlZW4uIExlYXZlIGEgc3BhY2UgZm9yIGl0LiAqL1xyXG5cclxuLyogQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgLmJvZHktY29udGVudCB7XHJcbiAgICAgIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiBAbWVkaWEobWluLXdpZHRoOjkyMHB4KXtcclxuICAgIH1cclxuXHJcbiAgLmV4YW1wbGUtY29udGFpbmVybmF2IHtcclxuICAgIHdpZHRoOiAxMDB2dztcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBwYWRkaW5nOiAwcHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5leGFtcGxlLXNpZGVuYXYtY29udGVudCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLmV4YW1wbGUtc2lkZW5hdiB7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuXHJcbiAgfSAgKi9cclxuXHJcbi8qIEZpeGVzIGRyb3Bkb3duIG1lbnVzIHBsYWNlZCBvbiB0aGUgcmlnaHQgc2lkZSAqL1xyXG5cclxuLyogLm1sLWF1dG8gLmRyb3Bkb3duLW1lbnUge1xyXG4gICAgbGVmdDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgcmlnaHQ6IDBweDtcclxuICB9ICovXHJcblxyXG5ib2R5IHtcclxuICBmb250LXNpemU6IDAuODc1cmVtO1xyXG59XHJcblxyXG4uZmVhdGhlciB7XHJcbiAgd2lkdGg6IDE2cHg7XHJcbiAgaGVpZ2h0OiAxNnB4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiB0ZXh0LWJvdHRvbTtcclxufVxyXG5cclxuLypcclxuICAgKiBTaWRlYmFyXHJcbiAgICovXHJcblxyXG4uc2lkZWJhciB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICB6LWluZGV4OiAxMDA7XHJcbiAgLyogQmVoaW5kIHRoZSBuYXZiYXIgKi9cclxuICBwYWRkaW5nOiA0OHB4IDAgMDtcclxuICAvKiBIZWlnaHQgb2YgbmF2YmFyICovXHJcbn1cclxuXHJcbi5zaWRlYmFyLXN0aWNreSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogMDtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA0OHB4KTtcclxuICBwYWRkaW5nLXRvcDogMC41cmVtO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIC8qIFNjcm9sbGFibGUgY29udGVudHMgaWYgdmlld3BvcnQgaXMgc2hvcnRlciB0aGFuIGNvbnRlbnQuICovXHJcbn1cclxuXHJcbkBzdXBwb3J0cyAoKHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreSkgb3IgKHBvc2l0aW9uOiBzdGlja3kpKSB7XHJcbiAgLnNpZGViYXItc3RpY2t5IHtcclxuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcclxuICAgIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzAzNjQxO1xyXG4gICAgd2lkdGg6IDgwcHg7XHJcbiAgfVxyXG59XHJcblxyXG4uc2lkZWJhciAubmF2LWxpbmsge1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6ICM2ZDVlZDcgIWltcG9ydGFudDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnNpZGViYXIgLm5hdi1saW5rIC5mZWF0aGVyIHtcclxuICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICBjb2xvcjogIzk5OTtcclxufVxyXG5cclxuLnNpZGViYXIgLm5hdi1saW5rLmFjdGl2ZSB7XHJcbiAgY29sb3I6ICMwMDdiZmY7XHJcbn1cclxuXHJcbi5zaWRlYmFyIC5uYXYtbGluazpob3ZlciAuZmVhdGhlciwgLnNpZGViYXIgLm5hdi1saW5rLmFjdGl2ZSAuZmVhdGhlciB7XHJcbiAgY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbi5zaWRlYmFyLWhlYWRpbmcge1xyXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4vKlxyXG4gICAqIENvbnRlbnRcclxuICAgKi9cclxuXHJcbltyb2xlPVwibWFpblwiXSB7XHJcbiAgcGFkZGluZy10b3A6IDMwcHg7XHJcbiAgLyogU3BhY2UgZm9yIGZpeGVkIG5hdmJhciAqL1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAvKiBsZWZ0OiAtMTBweDsgKi9cclxufVxyXG5cclxuLypcclxuICAgKiBOYXZiYXJcclxuICAgKi9cclxuXHJcbi5maXhlZC10b3Age1xyXG4gIGhlaWdodDogNzBweDtcclxuICAvKiBvdmVyZmxvdzogaGlkZGVuOyAqL1xyXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NjNkN2M7XHJcbn1cclxuXHJcbi5uYXZiYXItYnJhbmQge1xyXG4gIC8qIGNvbG9yOiByZ2JhKDAsMCwwLC45KTtcclxuICAgIGJhY2tncm91bmQ6ICMzMDM2NDE7ICovXHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IC0xNnB4O1xyXG4gIG1heC13aWR0aDogODBweDtcclxuICB3aWR0aDogODBweDtcclxuICBoZWlnaHQ6IDcwcHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubmF2YmFyIC5mb3JtLWNvbnRyb2wge1xyXG4gIHBhZGRpbmc6IDAuNzVyZW0gMXJlbTtcclxuICBib3JkZXItd2lkdGg6IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMDtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbC1kYXJrIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XHJcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wtZGFyazpmb2N1cyB7XHJcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTE3MHB4KSB7XHJcbiAgLnNpZGViYXItc3RpY2t5IHtcclxuICAgIHdpZHRoOiA4NXB4O1xyXG4gIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppLayoutComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-app-layout',
                templateUrl: './app-layout.component.html',
                styleUrls: ['./app-layout.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-timeago */ "twue");
/* harmony import */ var _xema_queue_monitor_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @xema/queue-monitor-panel */ "T4/f");
/* harmony import */ var _xema_team_monitor_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @xema/team-monitor-panel */ "LzZt");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-material.module */ "B+Mi");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _mat_dialog_mat_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mat-dialog/mat-dialog.component */ "GEyD");
/* harmony import */ var _auth_connect_connect_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth/connect/connect.component */ "OLlN");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth/login/login.component */ "bsvf");
/* harmony import */ var _auth_phone_selection_phone_selection_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./auth/phone-selection/phone-selection.component */ "M0aV");
/* harmony import */ var _auth_server_selection_server_selection_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./auth/server-selection/server-selection.component */ "qJlm");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "QX6l");
/* harmony import */ var _call_disposition_tools_disposition_tools_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_call/disposition-tools/disposition-tools.component */ "BJsK");
/* harmony import */ var _call_ongoing_status_ongoing_status_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./_call/ongoing-status/ongoing-status.component */ "p9ZU");
/* harmony import */ var _call_phone_status_phone_status_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_call/phone-status/phone-status.component */ "F/a1");
/* harmony import */ var _call_task_status_task_status_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_call/task-status/task-status.component */ "CWdN");
/* harmony import */ var _components_agent_list_agent_list_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./_components/agent-list/agent-list.component */ "eI3/");
/* harmony import */ var _components_agent_status_agent_status_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_components/agent-status/agent-status.component */ "43XP");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_components/messenger/messenger.component */ "ydJu");
/* harmony import */ var _components_recent_calls_recent_calls_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_components/recent-calls/recent-calls.component */ "KGjn");
/* harmony import */ var _layout_app_layout_app_layout_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./_layout/app-layout/app-layout.component */ "W3wt");
/* harmony import */ var _layout_login_layout_login_layout_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./_layout/login-layout/login-layout.component */ "sJKb");
/* harmony import */ var _navigation_nav_sidebar_nav_sidebar_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_navigation/nav-sidebar/nav-sidebar.component */ "fnF2");
/* harmony import */ var _navigation_nav_topbar_nav_topbar_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./_navigation/nav-topbar/nav-topbar.component */ "rJt7");
/* harmony import */ var _code_custom_clock__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./_code/custom-clock */ "hhLU");
/* harmony import */ var _code_custom_formatter__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_code/custom-formatter */ "6C6p");
































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
            _app_material_module__WEBPACK_IMPORTED_MODULE_8__["AppMaterialComponentsModule"],
            _xema_queue_monitor_panel__WEBPACK_IMPORTED_MODULE_5__["QueueMonitorPanelModule"],
            _xema_team_monitor_panel__WEBPACK_IMPORTED_MODULE_6__["TeamMonitorPanelModule"],
            ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoModule"].forRoot({
                formatter: { provide: ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoFormatter"], useClass: _code_custom_formatter__WEBPACK_IMPORTED_MODULE_29__["CustomFormatter"] },
                clock: { provide: ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoClock"], useClass: _code_custom_clock__WEBPACK_IMPORTED_MODULE_28__["CustomClock"] },
            })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
        _call_phone_status_phone_status_component__WEBPACK_IMPORTED_MODULE_18__["PhoneStatusComponent"],
        _auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__["LoginComponent"],
        _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_15__["DashboardComponent"],
        _navigation_nav_topbar_nav_topbar_component__WEBPACK_IMPORTED_MODULE_27__["NavTopbarComponent"],
        _navigation_nav_sidebar_nav_sidebar_component__WEBPACK_IMPORTED_MODULE_26__["NavSidebarComponent"],
        _layout_app_layout_app_layout_component__WEBPACK_IMPORTED_MODULE_24__["AppLayoutComponent"],
        _layout_login_layout_login_layout_component__WEBPACK_IMPORTED_MODULE_25__["LoginLayoutComponent"],
        _auth_phone_selection_phone_selection_component__WEBPACK_IMPORTED_MODULE_13__["PhoneSelectionComponent"],
        _components_agent_list_agent_list_component__WEBPACK_IMPORTED_MODULE_20__["AgentListComponent"],
        _call_disposition_tools_disposition_tools_component__WEBPACK_IMPORTED_MODULE_16__["DispositionToolsComponent"],
        _mat_dialog_mat_dialog_component__WEBPACK_IMPORTED_MODULE_10__["MatDialogComponent"],
        _call_task_status_task_status_component__WEBPACK_IMPORTED_MODULE_19__["TaskStatusComponent"],
        _call_ongoing_status_ongoing_status_component__WEBPACK_IMPORTED_MODULE_17__["OngoingStatusComponent"],
        _components_agent_status_agent_status_component__WEBPACK_IMPORTED_MODULE_21__["AgentStatusComponent"],
        _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_22__["MessengerComponent"],
        _components_recent_calls_recent_calls_component__WEBPACK_IMPORTED_MODULE_23__["RecentCallsComponent"],
        _auth_server_selection_server_selection_component__WEBPACK_IMPORTED_MODULE_14__["ServerSelectionComponent"],
        _auth_connect_connect_component__WEBPACK_IMPORTED_MODULE_11__["ConnectComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
        _app_material_module__WEBPACK_IMPORTED_MODULE_8__["AppMaterialComponentsModule"],
        _xema_queue_monitor_panel__WEBPACK_IMPORTED_MODULE_5__["QueueMonitorPanelModule"],
        _xema_team_monitor_panel__WEBPACK_IMPORTED_MODULE_6__["TeamMonitorPanelModule"], ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
                    _call_phone_status_phone_status_component__WEBPACK_IMPORTED_MODULE_18__["PhoneStatusComponent"],
                    _auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__["LoginComponent"],
                    _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_15__["DashboardComponent"],
                    _navigation_nav_topbar_nav_topbar_component__WEBPACK_IMPORTED_MODULE_27__["NavTopbarComponent"],
                    _navigation_nav_sidebar_nav_sidebar_component__WEBPACK_IMPORTED_MODULE_26__["NavSidebarComponent"],
                    _layout_app_layout_app_layout_component__WEBPACK_IMPORTED_MODULE_24__["AppLayoutComponent"],
                    _layout_login_layout_login_layout_component__WEBPACK_IMPORTED_MODULE_25__["LoginLayoutComponent"],
                    _auth_phone_selection_phone_selection_component__WEBPACK_IMPORTED_MODULE_13__["PhoneSelectionComponent"],
                    _components_agent_list_agent_list_component__WEBPACK_IMPORTED_MODULE_20__["AgentListComponent"],
                    _call_disposition_tools_disposition_tools_component__WEBPACK_IMPORTED_MODULE_16__["DispositionToolsComponent"],
                    _mat_dialog_mat_dialog_component__WEBPACK_IMPORTED_MODULE_10__["MatDialogComponent"],
                    _call_task_status_task_status_component__WEBPACK_IMPORTED_MODULE_19__["TaskStatusComponent"],
                    _call_ongoing_status_ongoing_status_component__WEBPACK_IMPORTED_MODULE_17__["OngoingStatusComponent"],
                    _components_agent_status_agent_status_component__WEBPACK_IMPORTED_MODULE_21__["AgentStatusComponent"],
                    _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_22__["MessengerComponent"],
                    _components_recent_calls_recent_calls_component__WEBPACK_IMPORTED_MODULE_23__["RecentCallsComponent"],
                    _auth_server_selection_server_selection_component__WEBPACK_IMPORTED_MODULE_14__["ServerSelectionComponent"],
                    _auth_connect_connect_component__WEBPACK_IMPORTED_MODULE_11__["ConnectComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                    _app_material_module__WEBPACK_IMPORTED_MODULE_8__["AppMaterialComponentsModule"],
                    _xema_queue_monitor_panel__WEBPACK_IMPORTED_MODULE_5__["QueueMonitorPanelModule"],
                    _xema_team_monitor_panel__WEBPACK_IMPORTED_MODULE_6__["TeamMonitorPanelModule"],
                    ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoModule"].forRoot({
                        formatter: { provide: ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoFormatter"], useClass: _code_custom_formatter__WEBPACK_IMPORTED_MODULE_29__["CustomFormatter"] },
                        clock: { provide: ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoClock"], useClass: _code_custom_clock__WEBPACK_IMPORTED_MODULE_28__["CustomClock"] },
                    })
                ],
                entryComponents: [
                    _mat_dialog_mat_dialog_component__WEBPACK_IMPORTED_MODULE_10__["MatDialogComponent"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "b/np":
/*!**********************************************!*\
  !*** ./src/app/_code/manager-environment.ts ***!
  \**********************************************/
/*! exports provided: ManagerEnvironment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerEnvironment", function() { return ManagerEnvironment; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ "AytR");

class ManagerEnvironment {
    static getBackendUrl() {
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backend !== '') {
            return _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backend;
        }
        else {
            return localStorage.getItem('backend');
        }
    }
}


/***/ }),

/***/ "bsvf":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_code/manager-environment */ "b/np");
/* harmony import */ var jema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jema */ "KJ4G");
/* harmony import */ var jema__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jema__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");














function LoginComponent_mat_progress_bar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 11);
} }
function LoginComponent_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "User Name is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_mat_error_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Special characters are not allowed");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_mat_error_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "60 characters max.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_mat_error_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_mat_error_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Do you really remember this password?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class LoginComponent {
    constructor(service) {
        this.service = service;
        this.isLoading = false;
        this.hasError = (controlName, errorName) => {
            return this.loginForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.disable = false;
        this.manager = src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_3__["ManagerEnvironment"].getBackendUrl();
        // this.service.IsAgentAuthenticated().subscribe(
        //   data => {
        //     this.bus.setAppState({ state: 'LoggedIn' });
        //   },
        //   err => {
        //     console.error(err);
        //   }
        // );
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60),
            ]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(100)])
        });
    }
    submit() {
        this.isLoading = true;
        this.disable = true;
        const auth = new jema__WEBPACK_IMPORTED_MODULE_4__["Authenticator"](src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_3__["ManagerEnvironment"].getBackendUrl());
        auth.getAuthToken(this.loginForm.value).subscribe((data) => {
            this.isLoading = false;
            this.disable = false;
            this.service.saveToken(data.auth_token);
            this.service.setAppState({ state: 'LoggedIn' });
        }, err => {
            this.isLoading = false;
            this.disable = false;
            if (err.response !== undefined) {
                err = err.response;
            }
            if (err.status === 401) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
                    icon: 'error',
                    title: 'Authentication failed!',
                    text: 'It seems you haven\'t entered valid credentials. Check your User Name and Password!'
                });
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message
                });
            }
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_5__["BackendService"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 27, vars: 9, consts: [["autocomplete", "off", 3, "formGroup", "ngSubmit"], ["mode", "indeterminate", 4, "ngIf"], ["mat-card-avatar", "", 1, "agent-image"], [1, "mb-1"], [1, "mat-card-subtitle"], [1, "w-75"], ["matInput", "", "type", "text", "placeholder", "User Id", "formControlName", "username", "id", "username"], [4, "ngIf"], ["matInput", "", "type", "password", "placeholder", "Password", "formControlName", "password", "id", "password"], ["mat-raised-button", "", "color", "primary", 3, "disabled"], ["target", "_manager", "mat-button", "", "color", "secondary", 3, "href"], ["mode", "indeterminate"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_0_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, LoginComponent_mat_progress_bar_1_Template, 1, 0, "mat-progress-bar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card-title", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Agent");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Welcome back");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " This is a business use computer system and is for authorized use only! Users of this computer system have no explicit or implicit expectation of privacy. Any and all user activity, data files, and communications on this system may be intercepted, monitored, recorded, copied, audited, inspected, and disclosed to local, state, or federal law enforcement, administrators, and/or their authorized agents. By clicking SUBMIT the user agrees to the above statement. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, LoginComponent_mat_error_14_Template, 2, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, LoginComponent_mat_error_15_Template, 2, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, LoginComponent_mat_error_16_Template, 2, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, LoginComponent_mat_error_20_Template, 2, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, LoginComponent_mat_error_21_Template, 2, 0, "mat-error", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "mat-card-actions", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "SUBMIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "MANAGE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("username", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("username", "pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("username", "maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("password", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("password", "maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.loginForm.valid || ctx.disable);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", ctx.manager, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatAnchor"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__["MatProgressBar"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatError"]], styles: [".agent-image[_ngcontent-%COMP%] {\r\n  background-image: url('female-agent1.jpg');\r\n  background-size: cover;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQ0FBMEQ7RUFDMUQsc0JBQXNCO0FBQ3hCIiwiZmlsZSI6ImxvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWdlbnQtaW1hZ2Uge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vLi4vLi4vYXNzZXRzL2ZlbWFsZS1hZ2VudDEuanBnJyk7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css']
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_5__["BackendService"] }]; }, null); })();


/***/ }),

/***/ "eI3/":
/*!****************************************************************!*\
  !*** ./src/app/_components/agent-list/agent-list.component.ts ***!
  \****************************************************************/
/*! exports provided: AgentListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentListComponent", function() { return AgentListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _interfaces_chat_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_interfaces/chat.message */ "Re1x");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");








function AgentListComponent_small_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AgentListComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "small", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](4, 4, ctx_r1.receivedDate, "EEEE, MMMM d, y"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.receivedFromAgent);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.receivedMessage, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](12, 7, ctx_r1.receivedDate, "h:mm a"));
} }
function AgentListComponent_tr_19_small_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AgentListComponent_tr_19_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "small", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](4, 3, ctx_r5.receivedDate, "EEEE, MMMM d, y"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5.receivedMessage, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](9, 6, ctx_r5.receivedDate, "h:mm a"));
} }
function AgentListComponent_tr_19_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AgentListComponent_tr_19_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const item_r3 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.visibleRowIndex = item_r3.id; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "perm_identity");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, AgentListComponent_tr_19_small_7_Template, 2, 0, "small", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "form", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, AgentListComponent_tr_19_div_10_Template, 10, 9, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "textarea", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AgentListComponent_tr_19_Template_button_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const item_r3 = ctx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.sendMessage(item_r3, null); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r3.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r3.name == ctx_r2.receivedFrom);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", ctx_r2.visibleRowIndex !== item_r3.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r3.name == ctx_r2.receivedFrom);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r2.message);
} }
class AgentListComponent {
    constructor(service) {
        this.service = service;
        this.visibleRowIndex = null;
        this.message = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [
        // Validators.required
        ]);
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        // this.receivedDate = new Date();
        this.chatMessage = new _interfaces_chat_message__WEBPACK_IMPORTED_MODULE_1__["ChatMessage"]();
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
AgentListComponent.ɵfac = function AgentListComponent_Factory(t) { return new (t || AgentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"])); };
AgentListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AgentListComponent, selectors: [["app-agent-list"]], decls: 20, vars: 6, consts: [[1, "w-100"], [2, "cursor", "pointer", 3, "click"], [1, "user"], ["class", "badge badge-pill badge-danger", 4, "ngIf"], [3, "hidden"], ["autocomplete", "off"], ["class", "form-group bg-light p-2 shadow border rounded clearfix", 4, "ngIf"], [1, "form-group", "input-group", "mt-n3"], ["placeholder", "Your message", 1, "form-control", "float-left", 3, "formControl"], [1, "input-group-append", "ml-n-2"], ["type", "button", 1, "btn", "btn-info", 3, "click"], [4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-danger"], [1, "form-group", "bg-light", "p-2", "shadow", "border", "rounded", "clearfix"], [1, "text-center", "mt-n4"], [1, "bg-white", "px-2", "day-label"], [1, "text-secondary", "m-0"], [1, "float-left"], [1, "text-secondary", "float-right"]], template: function AgentListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AgentListComponent_Template_a_click_2_listener() { return ctx.visibleRowIndex = 0; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "supervisor_account");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, AgentListComponent_small_8_Template, 2, 0, "small", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "form", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AgentListComponent_div_11_Template, 13, 10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "textarea", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AgentListComponent_Template_button_click_16_listener() { return ctx.sendMessage(null, ctx.group); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "send");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, AgentListComponent_tr_19_Template, 18, 5, "tr", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.group == null ? null : ctx.group.teamName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.group == null ? null : ctx.group.teamName) == ctx.receivedFrom);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", ctx.visibleRowIndex !== 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.group == null ? null : ctx.group.teamName) == ctx.receivedFrom);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.message);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.result);
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"]], styles: [".chat_container[_ngcontent-%COMP%] {\r\n  width: 300px;\r\n  position: fixed;\r\n  right: 15px;\r\n  bottom: 10px;\r\n}\r\n\r\n.chat_container[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\r\n  height: 350px;\r\n  overflow: auto;\r\n}\r\n\r\n.close_btn[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  font-size: 16px;\r\n  font-weight: normal;\r\n  \r\n  white-space: normal !important;\r\n}\r\n\r\n.type[_ngcontent-%COMP%] {\r\n  width: 88% !important;\r\n}\r\n\r\n.type[_ngcontent-%COMP%]:focus {\r\n  border: none !important;\r\n  box-shadow: none !important;\r\n  outline: none !important;\r\n  font-size: 16px;\r\n}\r\n\r\n.msg_icon[_ngcontent-%COMP%] {\r\n  background: #060473 !important\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 22px;\r\n  color: #ccc;\r\n}\r\n\r\n.time[_ngcontent-%COMP%] {\r\n  font-size: 12px !important;\r\n  position: relative;\r\n  color: #b0bec5 !important;\r\n}\r\n\r\n.time_left[_ngcontent-%COMP%] {\r\n  left: 36px;\r\n}\r\n\r\n.time_right[_ngcontent-%COMP%] {\r\n  top: -15px;\r\n  right: 10px;\r\n}\r\n\r\n.chat[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  bottom: 0px;\r\n  right: 15px;\r\n}\r\n\r\n.close_btn[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n  position: absolute;\r\n  right: 10px;\r\n  top: 10px;\r\n}\r\n\r\n.user_info[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\r\n  \r\n  position: relative;\r\n  top: 8px;\r\n  color: #17a2b8;\r\n}\r\n\r\n.pill-bg[_ngcontent-%COMP%] {\r\n  background: #563d7c !important\r\n}\r\n\r\n.pill-bg[_ngcontent-%COMP%]:hover {\r\n  background: #360a79 !important\r\n}\r\n\r\n.card-header[_ngcontent-%COMP%] {\r\n  background-color: #fff !important\r\n}\r\n\r\ntextarea[_ngcontent-%COMP%] {\r\n  height: 48px;\r\n}\r\n\r\n.day-label[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  top: 2px\r\n}\r\n\r\n.badge-pill[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  top: -13px;\r\n  left: 10px;\r\n  padding-right: .4em;\r\n  padding-left: .4em;\r\n  border-radius: 10rem;\r\n}\r\n\r\n.user[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  top: -6px;\r\n  left: 5px\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QiwyQkFBMkI7RUFDM0Isd0JBQXdCO0VBQ3hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRTtBQUNGOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixrQkFBa0I7RUFDbEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsU0FBUztBQUNYOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsY0FBYztBQUNoQjs7QUFFQTtFQUNFO0FBQ0Y7O0FBRUE7RUFDRTtBQUNGOztBQUVBO0VBQ0U7QUFDRjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQjtBQUNGOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNUO0FBQ0YiLCJmaWxlIjoiYWdlbnQtbGlzdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoYXRfY29udGFpbmVyIHtcclxuICB3aWR0aDogMzAwcHg7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHJpZ2h0OiAxNXB4O1xyXG4gIGJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmNoYXRfY29udGFpbmVyIC5jYXJkLWJvZHkge1xyXG4gIGhlaWdodDogMzUwcHg7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbn1cclxuXHJcbi5jbG9zZV9idG4ge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNhcmQtYm9keSBzcGFuIHtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAvKiBjb2xvcjogIzQ1NWE2NDsgKi9cclxuICB3aGl0ZS1zcGFjZTogbm9ybWFsICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50eXBlIHtcclxuICB3aWR0aDogODglICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50eXBlOmZvY3VzIHtcclxuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG5cclxuLm1zZ19pY29uIHtcclxuICBiYWNrZ3JvdW5kOiAjMDYwNDczICFpbXBvcnRhbnRcclxufVxyXG5cclxuLmNhcmQtZm9vdGVyIGkge1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBjb2xvcjogI2NjYztcclxufVxyXG5cclxuLnRpbWUge1xyXG4gIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBjb2xvcjogI2IwYmVjNSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udGltZV9sZWZ0IHtcclxuICBsZWZ0OiAzNnB4O1xyXG59XHJcblxyXG4udGltZV9yaWdodCB7XHJcbiAgdG9wOiAtMTVweDtcclxuICByaWdodDogMTBweDtcclxufVxyXG5cclxuLmNoYXQge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBib3R0b206IDBweDtcclxuICByaWdodDogMTVweDtcclxufVxyXG5cclxuLmNsb3NlX2J0biB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMTBweDtcclxuICB0b3A6IDEwcHg7XHJcbn1cclxuXHJcbi51c2VyX2luZm8gbWF0LWljb24ge1xyXG4gIC8qIGZvbnQtc2l6ZTogMzJweDsgKi9cclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiA4cHg7XHJcbiAgY29sb3I6ICMxN2EyYjg7XHJcbn1cclxuXHJcbi5waWxsLWJnIHtcclxuICBiYWNrZ3JvdW5kOiAjNTYzZDdjICFpbXBvcnRhbnRcclxufVxyXG5cclxuLnBpbGwtYmc6aG92ZXIge1xyXG4gIGJhY2tncm91bmQ6ICMzNjBhNzkgIWltcG9ydGFudFxyXG59XHJcblxyXG4uY2FyZC1oZWFkZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmYgIWltcG9ydGFudFxyXG59XHJcblxyXG50ZXh0YXJlYSB7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG59XHJcblxyXG4uZGF5LWxhYmVsIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiAycHhcclxufVxyXG5cclxuLmJhZGdlLXBpbGwge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC0xM3B4O1xyXG4gIGxlZnQ6IDEwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogLjRlbTtcclxuICBwYWRkaW5nLWxlZnQ6IC40ZW07XHJcbiAgYm9yZGVyLXJhZGl1czogMTByZW07XHJcbn1cclxuXHJcbi51c2VyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiAtNnB4O1xyXG4gIGxlZnQ6IDVweFxyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AgentListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-agent-list",
                templateUrl: "./agent-list.component.html",
                styleUrls: ["./agent-list.component.css"],
            }]
    }], function () { return [{ type: _shared_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"] }]; }, null); })();


/***/ }),

/***/ "fnF2":
/*!******************************************************************!*\
  !*** ./src/app/_navigation/nav-sidebar/nav-sidebar.component.ts ***!
  \******************************************************************/
/*! exports provided: NavSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavSidebarComponent", function() { return NavSidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");




class NavSidebarComponent {
    constructor() {
        this.showFiller = false;
    }
    ngOnInit() {
    }
}
NavSidebarComponent.ɵfac = function NavSidebarComponent_Factory(t) { return new (t || NavSidebarComponent)(); };
NavSidebarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavSidebarComponent, selectors: [["app-nav-sidebar"]], decls: 11, vars: 0, consts: [[1, "nav", "flex-column", "mt-2"], [1, "nav-item", "pb-2"], ["routerLink", "/dashboard", 1, "nav-link", "active"], ["data-feather", "home"], [1, "sr-only"], [1, "dropdown-divider", "w-50", "d-block", "mx-auto"]], template: function NavSidebarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Dashboard ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "(current)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIcon"]], styles: [".nav-link[_ngcontent-%COMP%] {\r\n  color: #b0b1b3 !important;\r\n  text-align: center !important;\r\n  font-size: 10px;\r\n}\r\n\r\n.dropdown-divider[_ngcontent-%COMP%] {\r\n  height: 0;\r\n  margin: .5rem 0;\r\n  overflow: hidden;\r\n  border-top: 1px solid #e9ecef;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi1zaWRlYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNkJBQTZCO0VBQzdCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQiw2QkFBNkI7QUFDL0IiLCJmaWxlIjoibmF2LXNpZGViYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXYtbGluayB7XHJcbiAgY29sb3I6ICNiMGIxYjMgIWltcG9ydGFudDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1kaXZpZGVyIHtcclxuICBoZWlnaHQ6IDA7XHJcbiAgbWFyZ2luOiAuNXJlbSAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlOWVjZWY7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavSidebarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-nav-sidebar',
                templateUrl: './nav-sidebar.component.html',
                styleUrls: ['./nav-sidebar.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "hhLU":
/*!***************************************!*\
  !*** ./src/app/_code/custom-clock.ts ***!
  \***************************************/
/*! exports provided: CustomClock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomClock", function() { return CustomClock; });
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-timeago */ "twue");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");


// ticks every s
class CustomClock extends ngx_timeago__WEBPACK_IMPORTED_MODULE_0__["TimeagoClock"] {
    tick(then) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(1000);
    }
}


/***/ }),

/***/ "p9ZU":
/*!******************************************************************!*\
  !*** ./src/app/_call/ongoing-status/ongoing-status.component.ts ***!
  \******************************************************************/
/*! exports provided: OngoingStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OngoingStatusComponent", function() { return OngoingStatusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");





function OngoingStatusComponent_div_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OngoingStatusComponent_div_2_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const call_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.park(call_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const call_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", call_r3.cli, " \u00A0 ");
} }
function OngoingStatusComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, OngoingStatusComponent_div_2_button_1_Template, 4, 1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const call_r3 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", call_r3.cli !== ctx_r0.unknown);
} }
function OngoingStatusComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "call_split");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.conferenceCall == null ? null : ctx_r1.conferenceCall.members.length, " \u00A0 ");
} }
function OngoingStatusComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OngoingStatusComponent_div_8_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const call_r9 = ctx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.resume(call_r9); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "pause");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const call_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", call_r9.cli, " \u00A0 ");
} }
class OngoingStatusComponent {
    constructor(service) {
        this.service = service;
        this.unknown = '<unknown>';
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.bus.ongoingCalls.subscribe((list) => {
            this.ongoingCallsList = list;
        });
        this.bus.parkedChannels.subscribe((list) => {
            this.parkedChannelsList = list;
        });
        this.bus.conferenceCall.subscribe((call) => {
            this.conferenceCall = call;
        });
    }
    park(call) {
        this.bus.hold(call.remoteChannel);
    }
    resume(call) {
        this.ongoingCallsList.forEach(otherCall => {
            this.bus.hold(otherCall.remoteChannel);
        });
        this.bus.resume(call.channel);
    }
}
OngoingStatusComponent.ɵfac = function OngoingStatusComponent_Factory(t) { return new (t || OngoingStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"])); };
OngoingStatusComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OngoingStatusComponent, selectors: [["app-ongoing-status"]], decls: 9, vars: 3, consts: [[1, "list-unstyled"], [4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary"], [4, "ngIf"], ["style", "position:relative;top:-24px;", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "material-icons", "pull-right", 2, "margin-top", "6px"], [2, "position", "relative", "top", "-24px"]], template: function OngoingStatusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, OngoingStatusComponent_div_2_Template, 2, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, OngoingStatusComponent_span_6_Template, 4, 1, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, OngoingStatusComponent_div_8_Template, 5, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ongoingCallsList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.conferenceCall == null ? null : ctx.conferenceCall.members.length) > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.parkedChannelsList);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZ29pbmctc3RhdHVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUciLCJmaWxlIjoib25nb2luZy1zdGF0dXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGJ1dHRvbi5tYXQtcHJpbWFyeSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWQ2ZGM1ICFpbXBvcnRhbnQ7XHJcbn0gKi8iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OngoingStatusComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-ongoing-status',
                templateUrl: './ongoing-status.component.html',
                styleUrls: ['./ongoing-status.component.css']
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_1__["BackendService"] }]; }, null); })();


/***/ }),

/***/ "qJlm":
/*!*********************************************************************!*\
  !*** ./src/app/auth/server-selection/server-selection.component.ts ***!
  \*********************************************************************/
/*! exports provided: ServerSelectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerSelectionComponent", function() { return ServerSelectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_code/manager-environment */ "b/np");
/* harmony import */ var jema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jema */ "KJ4G");
/* harmony import */ var jema__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jema__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");












function ServerSelectionComponent_mat_error_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Server IP Address or URL is required.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ServerSelectionComponent_mat_error_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " A good IP Address or URL is usually not that long. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ServerSelectionComponent {
    constructor(service) {
        this.service = service;
        this.tester = new jema__WEBPACK_IMPORTED_MODULE_3__["NetworkTester"]();
        this.hasError = (controlName, errorName) => {
            return this.serverSelectionForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.serverSelectionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            serverIp: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]),
        });
        if (src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_2__["ManagerEnvironment"].getBackendUrl() !== null &&
            src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_2__["ManagerEnvironment"].getBackendUrl() !== undefined &&
            src_app_code_manager_environment__WEBPACK_IMPORTED_MODULE_2__["ManagerEnvironment"].getBackendUrl() !== '') {
            this.service.setAppState({ state: 'ServerFound' });
        }
        else {
            const detectedServerName = location.hostname + (location.port ? ':' + location.port : '');
            const detectedProtocol = location.protocol;
            this.tester.ping(detectedProtocol + '//' + detectedServerName).subscribe(() => {
                this.serverSelectionForm.controls['serverIp'].setValue(detectedServerName);
            });
        }
    }
    saveIpAddress() {
        let url = this.serverSelectionForm.value.serverIp;
        if (!url.startsWith('http:') && !url.startsWith('https:')) {
            url = location.protocol + '//' + url;
        }
        this.service.saveBackendIpAddress(url);
        this.service.setAppState({ state: 'ServerFound' });
    }
}
ServerSelectionComponent.ɵfac = function ServerSelectionComponent_Factory(t) { return new (t || ServerSelectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"])); };
ServerSelectionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ServerSelectionComponent, selectors: [["app-server-selection"]], decls: 21, vars: 4, consts: [["autocomplete", "off", 3, "formGroup", "ngSubmit"], ["mat-card-avatar", "", 1, "agent-image"], [1, "mat-card-subtitle"], ["matInput", "", "type", "text", "placeholder", "IP Address", "formControlName", "serverIp", "id", "ip"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "disabled"]], template: function ServerSelectionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function ServerSelectionComponent_Template_form_ngSubmit_0_listener() { return ctx.saveIpAddress(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Agent");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-card-subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Locate a server");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Welcome here.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Who is serving you calls today? If you haven't found anybody to serve you, we may be able to help you. Talk to us! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ServerSelectionComponent_mat_error_16_Template, 2, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ServerSelectionComponent_mat_error_17_Template, 2, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "SUBMIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.serverSelectionForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("serverIp", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("serverIp", "maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.serverSelectionForm.valid);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatError"]], styles: [".agent-image[_ngcontent-%COMP%] {\r\n  background-image: url('female-agent1.jpg');\r\n  background-size: cover;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci1zZWxlY3Rpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBDQUEwRDtFQUMxRCxzQkFBc0I7QUFDeEIiLCJmaWxlIjoic2VydmVyLXNlbGVjdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFnZW50LWltYWdlIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4uLy4uLy4uL2Fzc2V0cy9mZW1hbGUtYWdlbnQxLmpwZycpO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServerSelectionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-server-selection',
                templateUrl: './server-selection.component.html',
                styleUrls: ['./server-selection.component.css']
            }]
    }], function () { return [{ type: src_app_shared_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"] }]; }, null); })();


/***/ }),

/***/ "rJt7":
/*!****************************************************************!*\
  !*** ./src/app/_navigation/nav-topbar/nav-topbar.component.ts ***!
  \****************************************************************/
/*! exports provided: NavTopbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavTopbarComponent", function() { return NavTopbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_mat_dialog_mat_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/mat-dialog/mat-dialog.component */ "GEyD");
/* harmony import */ var _shared_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/backend.service */ "NaRD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_shared/shared-data.service */ "zh9A");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _call_phone_status_phone_status_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_call/phone-status/phone-status.component */ "F/a1");
/* harmony import */ var _call_task_status_task_status_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_call/task-status/task-status.component */ "CWdN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _call_disposition_tools_disposition_tools_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_call/disposition-tools/disposition-tools.component */ "BJsK");
/* harmony import */ var _call_ongoing_status_ongoing_status_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_call/ongoing-status/ongoing-status.component */ "p9ZU");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");













function NavTopbarComponent_li_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-ongoing-status", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NavTopbarComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavTopbarComponent_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.askBreak(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Break");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NavTopbarComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavTopbarComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.cancelBreak(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Cancel Break");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NavTopbarComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavTopbarComponent_button_11_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.exitBreak(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Resume");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class NavTopbarComponent {
    constructor(service, router, shared, dialog) {
        this.service = service;
        this.router = router;
        this.shared = shared;
        this.dialog = dialog;
        this.bus = service.getServerConnection();
    }
    ngOnInit() {
        this.bus.phoneState.subscribe((state) => {
            this.phoneState = state;
        });
        this.bus.breakState.subscribe((state) => {
            this.breakState = state;
        });
        this.bus.agentInfo.subscribe((res) => {
            this.info = res;
        });
    }
    Logoff() {
        // this.bus.logout().subscribe(
        //   data => {
        //     this.service.setAppState({ state: 'Unknown' });
        //     localStorage.removeItem('access_token');
        //     this.router.navigateByUrl('/login');
        //   },
        //   err => {
        //     console.error(err);
        //   }
        // );
        this.service.setAppState({ state: "Unknown" });
        localStorage.removeItem("access_token");
        this.router.navigateByUrl("/login");
    }
    askBreak() {
        const dialogRef = this.dialog.open(src_app_mat_dialog_mat_dialog_component__WEBPACK_IMPORTED_MODULE_1__["MatDialogComponent"], {
            data: { info: this.info },
            disableClose: true,
        });
    }
    cancelBreak() {
        this.bus.cancelBreak();
    }
    exitBreak() {
        this.bus.exitBreak();
    }
}
NavTopbarComponent.ɵfac = function NavTopbarComponent_Factory(t) { return new (t || NavTopbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_4__["SharedDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"])); };
NavTopbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavTopbarComponent, selectors: [["app-nav-topbar"]], decls: 14, vars: 4, consts: [[1, "navbar-nav", "mr-auto", "ml-2", "ullist"], [1, "nav-item", "active", "mt-3"], [1, "nav-link"], [1, "nav-item", "mt-3"], ["class", "nav-item mt-3", 4, "ngIf"], [1, "text-right", "position-absolute", "break", "signout"], ["mat-raised-button", "", "color", "warn", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "accent", 3, "click", 4, "ngIf"], ["href", "", 1, "nav-link", "btn", "btn-sm", "btn-outline-secondary", "text-white", "signout", "position-absolute", 3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"]], template: function NavTopbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-phone-status", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-task-status", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, NavTopbarComponent_li_5_Template, 2, 0, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-disposition-tools", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, NavTopbarComponent_button_9_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, NavTopbarComponent_button_10_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, NavTopbarComponent_button_11_Template, 2, 0, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavTopbarComponent_Template_a_click_12_listener() { return ctx.Logoff(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Logout ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.phoneState.state !== "NOT_INUSE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.breakState.bsCode === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.breakState.bsCode === 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.breakState.bsCode === 2);
    } }, directives: [_call_phone_status_phone_status_component__WEBPACK_IMPORTED_MODULE_6__["PhoneStatusComponent"], _call_task_status_task_status_component__WEBPACK_IMPORTED_MODULE_7__["TaskStatusComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _call_disposition_tools_disposition_tools_component__WEBPACK_IMPORTED_MODULE_9__["DispositionToolsComponent"], _call_ongoing_status_ongoing_status_component__WEBPACK_IMPORTED_MODULE_10__["OngoingStatusComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"]], styles: [".signout[_ngcontent-%COMP%] {\r\n  right: 15px;\r\n  top: 18px;\r\n  \r\n}\r\n\r\n.break[_ngcontent-%COMP%] {\r\n  right: 100px;\r\n}\r\n\r\nnav[_ngcontent-%COMP%] {\r\n  height: 60px !important;\r\n}\r\n\r\n.ullist[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  z-index: 999999;\r\n  top: -6px !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi10b3BiYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxTQUFTO0VBQ1QsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixvQkFBb0I7QUFDdEIiLCJmaWxlIjoibmF2LXRvcGJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZ25vdXQge1xyXG4gIHJpZ2h0OiAxNXB4O1xyXG4gIHRvcDogMThweDtcclxuICAvKiBjb2xvcjogIzZkNWVkNyAhaW1wb3J0YW50OyAqL1xyXG59XHJcblxyXG4uYnJlYWsge1xyXG4gIHJpZ2h0OiAxMDBweDtcclxufVxyXG5cclxubmF2IHtcclxuICBoZWlnaHQ6IDYwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnVsbGlzdCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHotaW5kZXg6IDk5OTk5OTtcclxuICB0b3A6IC02cHggIWltcG9ydGFudDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavTopbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-nav-topbar",
                templateUrl: "./nav-topbar.component.html",
                styleUrls: ["./nav-topbar.component.css"],
            }]
    }], function () { return [{ type: _shared_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: src_app_shared_shared_data_service__WEBPACK_IMPORTED_MODULE_4__["SharedDataService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "sJKb":
/*!****************************************************************!*\
  !*** ./src/app/_layout/login-layout/login-layout.component.ts ***!
  \****************************************************************/
/*! exports provided: LoginLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginLayoutComponent", function() { return LoginLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class LoginLayoutComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoginLayoutComponent.ɵfac = function LoginLayoutComponent_Factory(t) { return new (t || LoginLayoutComponent)(); };
LoginLayoutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginLayoutComponent, selectors: [["app-login-layout"]], decls: 5, vars: 0, consts: [[1, "container-fluid"], [1, "row", "wallpaper"], [1, "col-sm-7"], [1, "col-sm-4", "window"]], template: function LoginLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".wallpaper[_ngcontent-%COMP%] {\r\n  background: url('bg2.png');\r\n  height: 100vh;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.window[_ngcontent-%COMP%] {\r\n  \r\n  margin-top: 150px;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLWxheW91dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0VBT0U7O0FBRUY7RUFDRSwwQkFBMEM7RUFDMUMsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0IsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsMENBQTBDO0VBQzFDLGlCQUFpQjtFQUNqQixzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLDRCQUE0QjtBQUM5QiIsImZpbGUiOiJsb2dpbi1sYXlvdXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbldoZW4gdXNpbmcgY29udGFpbmVyLWZsdWlkLCBwdXQgdGhlIGNvbnRlbnQgaW5zaWRlIGEgcm93IHRvIGdldCBhIGZ1bGwgc2NyZWVuIGJhY2tncm91bmQuXHJcblxyXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbjxkaXYgY2xhc3M9XCJyb3cgd2FsbHBhcGVyXCI+XHJcbjwvZGl2PlxyXG48L2Rpdj5cclxuICovXHJcblxyXG4ud2FsbHBhcGVyIHtcclxuICBiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uLy4uL2Fzc2V0cy9iZzIucG5nJyk7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG59XHJcblxyXG4ud2luZG93IHtcclxuICAvKiBiYWNrZ3JvdW5kOiB1cmwoJy9hc3NldHMvYmxhY2sucG5nJyk7ICovXHJcbiAgbWFyZ2luLXRvcDogMTUwcHg7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginLayoutComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login-layout',
                templateUrl: './login-layout.component.html',
                styleUrls: ['./login-layout.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/login/login.component */ "bsvf");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "QX6l");
/* harmony import */ var _layout_app_layout_app_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_layout/app-layout/app-layout.component */ "W3wt");
/* harmony import */ var _layout_login_layout_login_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_layout/login-layout/login-layout.component */ "sJKb");
/* harmony import */ var _auth_phone_selection_phone_selection_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/phone-selection/phone-selection.component */ "M0aV");
/* harmony import */ var _auth_server_selection_server_selection_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth/server-selection/server-selection.component */ "qJlm");
/* harmony import */ var _auth_connect_connect_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth/connect/connect.component */ "OLlN");











const routes = [
    // application pages
    {
        path: '',
        component: _layout_app_layout_app_layout_component__WEBPACK_IMPORTED_MODULE_4__["AppLayoutComponent"],
        children: [
            { path: '', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"], pathMatch: 'full' },
        ]
    },
    // login, forgot password pages
    {
        path: '',
        component: _layout_login_layout_login_layout_component__WEBPACK_IMPORTED_MODULE_5__["LoginLayoutComponent"],
        children: [
            { path: 'server', component: _auth_server_selection_server_selection_component__WEBPACK_IMPORTED_MODULE_7__["ServerSelectionComponent"] },
            { path: 'login', component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
            { path: 'connect', component: _auth_connect_connect_component__WEBPACK_IMPORTED_MODULE_8__["ConnectComponent"] },
            { path: 'phone', component: _auth_phone_selection_phone_selection_component__WEBPACK_IMPORTED_MODULE_6__["PhoneSelectionComponent"] },
            { path: 'forgot', component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
        ]
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "ydJu":
/*!**************************************************************!*\
  !*** ./src/app/_components/messenger/messenger.component.ts ***!
  \**************************************************************/
/*! exports provided: MessengerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessengerComponent", function() { return MessengerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _agent_list_agent_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../agent-list/agent-list.component */ "eI3/");




class MessengerComponent {
    constructor() { }
    ngOnInit() {
    }
}
MessengerComponent.ɵfac = function MessengerComponent_Factory(t) { return new (t || MessengerComponent)(); };
MessengerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MessengerComponent, selectors: [["app-messenger"]], decls: 8, vars: 0, consts: [[1, "card", "my-5", "mx-3"], [1, "user_info", "card-header", "clearfix"], [1, "text-secondary"], [1, "card-body", "chatbox"]], template: function MessengerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Team members ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-agent-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIcon"], _agent_list_agent_list_component__WEBPACK_IMPORTED_MODULE_2__["AgentListComponent"]], styles: [".user_info[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\r\n  \r\n  position: relative;\r\n  top: 8px;\r\n  color: #17a2b8;\r\n}\r\n\r\n.card-header[_ngcontent-%COMP%] {\r\n  background-color: #fff !important\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  font-size: 16px;\r\n  font-weight: normal;\r\n  \r\n  white-space: normal !important;\r\n}\r\n\r\n.chatbox[_ngcontent-%COMP%] {\r\n  max-height: 270px;\r\n  overflow: auto;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsY0FBYztBQUNoQjs7QUFFQTtFQUNFO0FBQ0Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztBQUNoQiIsImZpbGUiOiJtZXNzZW5nZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VyX2luZm8gbWF0LWljb24ge1xyXG4gIC8qIGZvbnQtc2l6ZTogMzJweDsgKi9cclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiA4cHg7XHJcbiAgY29sb3I6ICMxN2EyYjg7XHJcbn1cclxuXHJcbi5jYXJkLWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZiAhaW1wb3J0YW50XHJcbn1cclxuXHJcbi5jYXJkLWJvZHkgc3BhbiB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgLyogY29sb3I6ICM0NTVhNjQ7ICovXHJcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uY2hhdGJveCB7XHJcbiAgbWF4LWhlaWdodDogMjcwcHg7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessengerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-messenger',
                templateUrl: './messenger.component.html',
                styleUrls: ['./messenger.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zh9A":
/*!************************************************!*\
  !*** ./src/app/_shared/shared-data.service.ts ***!
  \************************************************/
/*! exports provided: SharedDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedDataService", function() { return SharedDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SharedDataService {
    constructor() {
        this.callinfolist = [];
    }
}
SharedDataService.ɵfac = function SharedDataService_Factory(t) { return new (t || SharedDataService)(); };
SharedDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SharedDataService, factory: SharedDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SharedDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map