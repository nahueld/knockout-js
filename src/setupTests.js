require("jsdom-global/register");
global.$ = require("jquery");
global.expect = require("chai").expect;
global.sinon = require("sinon");
global.ko = require("knockout");
require("knockout.validation");
global.renderComponent = require("ko-component-tester").renderComponent;
global.renderHtml = require("ko-component-tester").renderHtml;
