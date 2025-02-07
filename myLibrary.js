class DesignerTool {
  constructor({
    containerId,
    posterSide,
    posterWidth,
    posterHeight,
    variables,
    siteVersion,
    uniqueId,
    htmlCode,
  }) {
    this.containerId = containerId;
    this.posterSide = posterSide;
    this.posterWidth = posterWidth;
    this.posterHeight = posterHeight;
    if (typeof variables === "string") {
      this.variables = variables.split(", ").map((variable) => variable.trim());
    } else {
      this.variables = variables;
    }
    this.u_id = uniqueId;
    this.siteVersion = siteVersion;
    this.htmlCodeImported = htmlCode;
    this.init();
  }

  loadDependencies(callback) {
    const dependencies = [
      {
        type: "css",
        url: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
      },
      { type: "css", url: "https://unpkg.com/filepond/dist/filepond.min.css" },
      { type: "css", url: "https://cdn.quilljs.com/1.3.6/quill.snow.css" },
      {
        type: "css",
        url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
      },
      {
        type: "css",
        url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      },
      {
        type: "css",
        url: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css",
      },
      {
        type: "js",
        url: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js",
      },
      {
        type: "js",
        url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
      },
      // { type: "js", url: "https://code.jquery.com/jquery-3.5.1.slim.min.js" },
      {
        type: "js",
        url: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
      },
      { type: "js", url: "https://cdn.quilljs.com/1.3.6/quill.js" },
      {
        type: "js",
        url: "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js",
      },
      {
        type: "js",
        url: "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.4.0/fabric.min.js",
      },
    ];

    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const loadStyle = (href, callback) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = callback;
      document.head.appendChild(link);
    };

    const loadNext = (index) => {
      if (index >= dependencies.length) {
        callback();
        return;
      }

      const dependency = dependencies[index];
      if (dependency.type === "js") {
        loadScript(dependency.url, () => loadNext(index + 1));
      } else if (dependency.type === "css") {
        loadStyle(dependency.url, () => loadNext(index + 1));
      }
    };

    loadNext(0);
  }

  addCustomStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        font-family: "Rubik", sans-serif;
        color: #344054;
      }
      #canvas-container {
        border: 1px solid #ccc;
        margin-top: 20px;
      }
      #output-container {
        margin-top: 20px;
      }
      .main_wraper .container-fluid {
        padding: 0;
        overflow-x: hidden;
      }
      img {
        max-width: 100%;
      }
      .letter_spacing {
        letter-spacing: -0.8px;
      }
      .text_sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      .font_semibold {
        font-weight: 600;
      }
      .text_xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      input,
      select {
        padding: 0.625rem 0.875rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        width: 100%;
        color: #101828;
        font-size: 1rem;
      }
      input:focus-visible,
      select:focus-visible {
        outline: none;
        border: 1px solid #c9133c;
      }
      .custom_btn {
        border: none;
        width: 100%;
        padding: 0.5rem 0.875rem;
        color: #fff;
        font-weight: 700;
        border-radius: 0.5rem;
        background: transparent;
      }
      .color_btn {
        background: #0d68fe;
      }
      .color_btn:hover {
        background: #a7062a;
      }
      .border_btn {
        color: #000000;
        border: 1px solid #d0d5dd;
      }
      .border_btn:hover {
        background: #f9fafb;
      }
      .next_btn {
        border: 1px solid #ca003a;
        background-color: #eb2451;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        font-size: 14px;
        font-family: "Rubik", sans-serif;
        letter-spacing: 0;
        padding: 0.535rem 1rem;
        color: #fff;
      }
      .next_btn:hover {
        background-color: #d5133f;
        border-color: #ca123c;
      }
      .main_wraper {
        height: 100vh;
      }
      .main_col {
        padding: 0;
      }
      .side_tabs .nav-item button {
        color: #95b9f4 !important;
        height: 48px;
        width: 48px;
        padding: 0;
      }
      .sidebar_wrapper #pills-tabContent .tab-pane.active {
        display: block;
      }
      .sidebar_wrapper #pills-tabContent .tab-pane {
        display: none;
      }
      .side_tabs .nav-item button.active,
      .side_tabs .nav-item button:hover {
        
        background-color: #0d68fe;
        color: #ffffff !important;
      }
      .side_tabs {
        background-color: #032c9a;
        padding-top: 2rem;
        border-top-right-radius: 25px;
        display: block;
      }
      .side_tabs li.nav-item {
        padding-left: 1rem;
        padding-right: 1rem;
        margin: 10px 0;
      }
      .side_tabs .nav-item .nav-link i {
        font-size: 20px;
      }
      .side_tabContent {
        border-right: 1px solid #eaecf0;
        padding: 2rem 1rem 2rem 0;
        position: relative;
      }
      button#removeSelected {
        position: absolute;
        right: 18px;
        bottom: 34px;
        width: fit-content;
      }
      .inner_tabs #pills-tab {
        border-bottom: 1px solid #ebebeb;
        gap: 0.5rem;
      }
      .inner_tabs #pills-tab button {
        background-color: transparent;
      }
      .inner_tabs #pills-tab button {
        background-color: transparent;
        padding: 0.5rem;
        color: #667085;
        border-bottom: 3px solid transparent;
        border-radius: 0;
        font-weight: 700;
      }
      .inner_tabs #pills-tab button.active,
      .inner_tabs #pills-tab button:hover {
        border-bottom: 3px solid #0d68fe;
        color: #0d68fe;
      }
      .fileuplad_main {
        max-height: 287.672px;
        overflow-y: auto;
      }
      .fileuplad_wrapper {
        position: relative;
        padding: 1rem 1.5rem;
        text-align: center;
        border: 2px solid #ebebeb;
        border-radius: 0.5rem;
      }
      .fileuplad_wrapper input#imageUploader {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        cursor: pointer;
        padding: 0;
      }
      .upload_icon {
        border: 1px solid #d1d5db;
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 0.5rem;
        margin: 0px auto 13px auto;
      }
      .upload_icon i {
        font-size: 20px;
      }
      .fileuplad_wrapper p span {
        color: #0d68fe;
        font-weight: 700;
      }
      .img_wrapper {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 0.75rem;
      }
      .img_wrapper .img_main {
        width: calc(95% / 2);
        position: relative;
        overflow: hidden;
        border-radius: 9px;
      }
      .img_wrapper .img_main:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100%;
        height: 0;
        background-color: #000000;
        opacity: 0;
        transition-duration: 0.3s;
      }
      .img_wrapper .img_main button {
        position: absolute;
        top: 4px;
        right: 4px;
        height: 24px;
        width: 24px;
        line-height: 20px;
        border: 0;
        background-color: #fff;
        border-radius: 100%;
        padding: 0;
        color: #f04438;
        font-size: 17px;
        opacity: 0;
        transition-duration: 0.3s;
      }
      .img_wrapper .img_main:hover button {
        opacity: 1;
      }
      .img_wrapper .img_main:hover:before {
        opacity: 32%;
        height: 100%;
      }
      body pre.language-html::-webkit-scrollbar {
        height: 8px !important;
        width: 8px !important;
      }
      .fileuplad_main::-webkit-scrollbar,
      .scroll_div::-webkit-scrollbar {
        width: 8px;
      }
      .fileuplad_main::-webkit-scrollbar-track,
      .scroll_div::-webkit-scrollbar-track,
      pre.language-html::-webkit-scrollbar-track {
        background: transparent;
      }
      .fileuplad_main::-webkit-scrollbar-thumb,
      .scroll_div::-webkit-scrollbar-thumb,
      pre.language-html::-webkit-scrollbar-thumb {
        background: #b3b3b3;
        border-radius: 10px;
      }
      .heading_main.scroll_div {
        max-height: 292px;
      }
      .heading_wrapper, .variable-list-wrapper li{
        border: 1px solid #eaecf0;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }
      .variable-list-wrapper{
        list-style: none;
        margin:0;
        padding:0;
        max-height: 400px;
        overflow-y: scroll;
      }
        .variable-list-wrapper li p{
          text-align:center;
        }
      .heading_main .heading_wrapper p,.variable-list-wrapper li p{
        display: inline-block;
        letter-spacing: 0em;
        line-height: 1;
        opacity: 1;
        font-weight: 300;
        font-style: normal;
        text-transform: none;
        color: rgb(0, 0, 0, 1);
        word-break: break-word;
        width: 100%;
        margin: 0;
        cursor: pointer;
        padding: 1.25rem;
      }
      .heading_main .heading_wrapper:nth-child(1) p {
        font-size: 32pt;
      }
      .heading_main .heading_wrapper:nth-child(2) p {
        font-size: 24pt;
      }
      .heading_main .heading_wrapper:nth-child(3) p {
        font-size: 16pt;
      }
      .heading_main .heading_wrapper:nth-child(4) p {
        font-size: 12pt;
      }
      .back_btn_wrapper {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .back_btn {
        border: none;
        background-color: transparent;
        padding: 0;
      }
      .two_col {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
      }
      .font_size {
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        padding: 0.625rem 0.875rem;
        gap: 10px;
      }
      .font_size input[type="number"] {
        padding: 0;
      }
      .font_size input[type="number"] {
        padding: 0;
        border: none;
        border-radius: 0;
      }
      .font_size input[type="number"]::-webkit-outer-spin-button,
      .font_size input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .font_size input[type="number"] {
        -moz-appearance: textfield;
      }
      .font_size span {
        color: #98a2b3;
      }
      select[name="font_weight"],
      .font_size {
        width: 50%;
      }
      .back_div select,
      .back_div input {
        font-weight: 600;
      }
      .text-align {
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border: 1px solid #eaecf0;
        background-color: #f9fafb;
        border-radius: 0.375rem;
      }
      .text-align button {
        border: none;
        background-color: transparent;
        color: #344054;
        border-radius: 0.375rem;
        padding: 0.375rem 0;
        width: 62px;
        height: 44px;
      }
      .text-align button.active {
        background-color: #fff;
        border: 1px solid;
      }
      .color_weight {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .color_weight #favcolor {
        background-color: transparent;
        border: none;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
      }
      .color_weight .text_weight {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .color_weight .text_weight button {
        background-color: transparent;
        height: 2.5rem;
        width: 2.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
      }
      .color_weight .text_weight button:hover {
        background-color: #f9fafb;
      }
      .canvas_wrapper {
        background-color: #ededed;
      }
      .canvas_wrapper_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem 2rem;
        background-color: #ededed;
      }
      .btn_groups {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .canvas_wrapper_header .btn_groups .custom_btn.border_btn,
      .canvas_wrapper_header .btn_groups .custom_btn.color_btn {
        width: auto;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .form-check.form-switch {
        padding: 0 0 0 45px;
        margin: 0;
        float: unset;
      }
      input#flexSwitchCheckDefault {
        position: relative;
        padding: 9px 18px;
        margin: 0;
      }
      input#flexSwitchCheckDefault:before,
      input#flexSwitchCheckDefault:after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        font-weight: 500;
      }
      input#flexSwitchCheckDefault:before {
        content: "Visual";
        left: -44px;
      }
      input#flexSwitchCheckDefault:after {
        content: "Code";
        right: -40px;
      }
      .form-check-input:focus {
        border-color: #d1d5db !important;
        outline: none;
        box-shadow: none;
      }
      .form-check-input:checked {
        background-color: #c9133c;
        border-color: #c9133c;
      }
      .create_artwork_wrapper .row {
        align-items: center;
      }
      .btn_wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        column-gap: 8px;
        row-gap: 5px;
      }
      .btn_wrapper button {
        width: calc(98.5% / 2);
        padding: 23px 23px;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 12px;
        border-radius: 6px;
      }
      .btn_wrapper button i {
        font-size: 23px;
      }
      .active_btn {
        border-color: #eb2451;
        color: #eb2451 !important;
      }
      .select_size_wrapper h4 {
        font-size: 2rem;
        margin: 1.5rem 0;
      }
      .select_size_wrapper label {
        color: #212121;
        opacity: 0.7;
      }
      .select_side {
        margin-top: 30px;
      }
      .select_size_wrapper .custom_btn.next_btn {
        width: fit-content;
        margin: 30px 0 auto auto;
        display: block;
      }
      .canva-view {
        display: flex;
      }
      .create_artwork_wrapper {
        display: none;
      }

      .size-btn.active,
      .side-btn.active {
        color: #eb2451;
        border-color: #eb2451;
      }
      .main-canva {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88%;
        background: #ededed;
      }
      #switch_btn{
        display:none;
      }
      .front_div {
        display: block;
      }
      .back_div {
        display: none;
      }
      .image-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      }

      .image-item {
        position: relative;
        margin: 10px;
        height: 60px;
        overflow: hidden;
      }

      .image-item img {
        max-width: 100px;
        max-height: 100px;
        display: block;
      }

      .trash-button {
        position: absolute;
        top: 0;
        right: 0;
        background: red;
        color: white;
        border: none;
        cursor: pointer;
      }
      div#htmlEditor {
        max-width: 780px;
        margin: 25px auto 0 auto;
      }
      pre.language-html {
        background-color: #fff;
        margin: 0 auto;
        padding: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        border: 1px solid #eaecf0;
        overflow: scroll;
        height: 400px !important;
      }
      div#htmlEditor button#downloadHtml {
        max-width: fit-content;
        margin-top: 25px;
      }
      .create_artwork_wrapper img {
        max-width: 60%;
      }
      .color_weight .text_weight .active {
        border: 1px solid;
      }
      .canvas_side {
        font-weight: 600;
        padding: 0.5rem 0.75rem;
        border: 4px solid #eaecf0;
        border-radius: 0.625rem;
        box-shadow: 0 0px 2px 0 #1018281a;
        font-size: 0.875rem;
        line-height: 1.25rem;
        background:#ffffff;
      }
        #save_btn{
        background:#ffffff;
        }
      .main-canva {
        position: relative;
      }
      .backside-addressbox {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 3.6in;
        height: 2.2in;
        background-color: white;
        z-index: 1;
        font-size: small;
        padding: 1em;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
  }

  init() {
    this.loadDependencies(() => {
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error(`Container with id "${this.containerId}" not found`);
        return;
      }
      const variableList = this.variables;
      let variableHtml = displayList(variableList);
      function displayList(items) {
        let html = "<ul class='variable-list-wrapper'>";
        items.forEach((item) => {
          const itemId = item.replace(/{{\s*|\s*}}/g, "");
          html += `<li class="add-param" id="${itemId}" data-text="${item}"><p>${item}</p></li>`;
        });
        html += "</ul>";
        return html;
      }

      container.innerHTML = `<div class="main_wraper">
      <div class="container-fluid h-100">
        <div class="row">
          <div class="create_artwork_wrapper">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="select_size_wrapper">
                    <h4>Create Artwork</h4>
                    <form>
                      <label class="mb-2">Select size</label>
                      <div class="btn_wrapper">
                        <button
                          class="custom_btn border_btn btn_disabled size-btn active"
                          data-height="4.25"
                          data-width="6.25"
                        >
                          <i class="fa fa-picture-o" aria-hidden="true"></i> 4"
                          x 6" Postcard
                        </button>
                        <button
                          class="custom_btn border_btn btn_disabled size-btn"
                          data-height="6.25"
                          data-width="9.25"
                        >
                          <i class="fa fa-picture-o" aria-hidden="true"></i> 6"
                          x 9" Postcard
                        </button>
                        <!-- <button class="custom_btn border_btn btn_disabled size-btn" data-height="6" data-width="11"><i class="fa fa-picture-o" aria-hidden="true"></i> 6" x 11" Postcard</button>
                                        <button class="custom_btn border_btn btn_disabled size-btn" data-height="8.5" data-width="11"><i class="fa fa-picture-o" aria-hidden="true"></i> 8.5" x 11" Letter</button> -->
                      </div>
                      <div class="select_side">
                        <label class="mb-2">Select side</label>
                        <div class="btn_wrapper">
                          <button
                            class="custom_btn border_btn side-btn active"
                            data-side="Front"
                          >
                            <i class="fa fa-picture-o" aria-hidden="true"></i
                            >Front
                          </button>
                          <button
                            class="custom_btn border_btn side-btn"
                            data-side="Back"
                          >
                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                            Back
                          </button>
                        </div>
                      </div>
                      <button class="custom_btn next_btn">Next</button>
                    </form>
                  </div>
                </div>
                <div class="col-md-6">
                  <img
                    src="https://app.directmailmanager.com/_nuxt/img/guy.8bcda05.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row h-100 canva-view">
          <div class="col-lg-4 h-100 main_col" id="sidebar">
            <div id="sidebar-main-section" class="sidebar_wrapper h-100">
              <div class="sidebar_ h-100">
                <div class="d-flex align-items-start h-100">
                  <ul
                    class="side_tabs nav nav-pills flex-column nav-pills me-3 align-items-end h-100"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-primary fw-semibold active position-relative"
                        id="pills-text-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-text"
                        type="button"
                        role="tab"
                        aria-controls="pills-text"
                        aria-selected="true"
                      >
                        <i class="fa fa-text-width" aria-hidden="true"></i>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-primary fw-semibold position-relative"
                        id="pills-image-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-image"
                        type="button"
                        role="tab"
                        aria-controls="pills-image"
                        aria-selected="false"
                      >
                        <i class="fa fa-picture-o" aria-hidden="true"></i>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-primary fw-semibold position-relative"
                        id="pills-qrcode-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-qrcode"
                        type="button"
                        role="tab"
                        aria-controls="pills-qrcode"
                        aria-selected="false"
                      >
                        <i class="fa fa-qrcode" aria-hidden="true"></i>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-primary fw-semibold position-relative"
                        id="pills-variable-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-variable"
                        type="button"
                        role="tab"
                        aria-controls="pills-variable"
                        aria-selected="false"
                      >
                        <i class="fa fa-asterisk" aria-hidden="true"></i>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-primary fw-semibold position-relative"
                        id="pills-location-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-location"
                        type="button"
                        role="tab"
                        aria-controls="pills-location"
                        aria-selected="false"
                      >
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                      </button>
                    </li>
                  </ul>
                  <ul
                    class="side_tabs nav nav-pills flex-column nav-pills me-3 align-items-end h-100"
                    id="back_tab"
                    role="tablist"
                    style="display: none"
                  >
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-primary fw-semibold active position-relative"
                        id="back_tab_btn"
                        type="button"
                        role="tab"
                        aria-controls="pills-text"
                        aria-selected="true"
                      >
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                      </button>
                    </li>
                  </ul>
                  <div
                    class="side_tabContent w-100 h-100"
                    id="pills-tabContent"
                  >
                    <div
                      class="tab-pane fade show active"
                      id="pills-text"
                      role="tabpanel"
                      aria-labelledby="pills-text-tab"
                    >
                      <div class="front_div">
                        <div class="tab_header mb-3">
                          <h2 class="text_xl font_semibold letter_spacing mb-1">
                            Add Text
                          </h2>
                          <p class="text_sm letter_spacing mb-0">
                            Add a new text / or select an existing textbox on
                            your artboard to edit.
                          </p>
                        </div>
                        <div class="heading_main">
                          <div class="heading_wrapper">
                            <p class="mb-0 add_text_btn" data-text="Heading 1">
                              Heading 1
                            </p>
                          </div>
                          <div class="heading_wrapper">
                            <p class="mb-0 add_text_btn" data-text="Heading 2">
                              Heading 2
                            </p>
                          </div>
                          <div class="heading_wrapper">
                            <p class="mb-0 add_text_btn" data-text="Heading 3">
                              Heading 3
                            </p>
                          </div>
                          <div class="heading_wrapper">
                            <p class="mb-0 add_text_btn" data-text="Paragraph">
                              Paragraph
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="back_div">
                        <div class="back_btn_wrapper mb-4">
                          <button id="back_btn" class="back_btn">
                            <i
                              class="fa fa-chevron-left"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <p class="text_xl font_semibold letter_spacing mb-0">
                            Edit text style
                          </p>
                        </div>
                        <div class="text_style scroll_div">
                          <p class="text_sm font_semibold letter_spacing mb-2">
                            Text
                          </p>
                          <div class="style_wrapper">
                            <select id="fontFamily" name="family" class="mb-3">
                              <option value="Arial">Arial</option>
                              <option value="Arial Black">Arial Black</option>
                              <option value="Courier New">Courier New</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Impact">Impact</option>
                              <option value="Inconsolata">Inconsolata</option>
                              <option value="Lato">Lato</option>
                              <option value="Lucida Console">
                                Lucida Console
                              </option>
                              <option value="Lucida Sans Unicode">
                                Lucida Sans Unicode
                              </option>
                              <option value="Merriweather">Merriweather</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Noto Sans">Noto Sans</option>
                              <option value="Nunito">Nunito</option>
                              <option value="Open Sans">Open Sans</option>
                              <option value="Oswald">Oswald</option>
                              <option value="Palatino Linotype">
                                Palatino Linotype
                              </option>
                              <option value="Poppins">Poppins</option>
                              <option value="PT Sans">PT Sans</option>
                              <option value="Playfair Display">
                                Playfair Display
                              </option>
                              <option value="Quicksand">Quicksand</option>
                              <option value="Raleway">Raleway</option>
                              <option value="Roboto">Roboto</option>
                              <option value="Rubik">Rubik</option>
                              <option value="Sans-Serif">Sans-Serif</option>
                              <option value="Source Sans Pro">
                                Source Sans Pro
                              </option>
                              <option value="Tahoma">Tahoma</option>
                              <option value="Times New Roman" selected>
                                Times New Roman
                              </option>
                              <option value="Trebuchet MS">Trebuchet MS</option>
                              <option value="Verdana">Verdana</option>
                            </select>
                            <div class="two_col">
                              <select id="fontWeight" name="weight" class="">
                                <option value="300" selected>Light</option>
                                <option value="400">Regular</option>
                                <option value="500">Medium</option>
                                <option value="600">Semi Bold</option>
                                <option value="700">Bold</option>
                              </select>
                              <div
                                class="font_size d-flex justify-content-center align-items-center"
                              >
                                <i
                                  class="fa fa-text-width"
                                  aria-hidden="true"
                                ></i>
                                <input
                                  type="number"
                                  id="fontSize"
                                  min="1"
                                  placeholder="Font Size"
                                />
                                <span>pt</span>
                              </div>
                            </div>
                            <div class="text-align mt-3">
                              <button class="left_align">
                                <i
                                  class="fa fa-align-left"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button class="center_align">
                                <i
                                  class="fa fa-align-center"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button class="right_align">
                                <i
                                  class="fa fa-align-right"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button class="justify_align">
                                <i
                                  class="fa fa-align-justify"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                            <div class="color_weight mt-3">
                              <input
                                type="color"
                                id="favcolor"
                                name="favcolor"
                                value="#000"
                              />
                              <div class="text_weight">
                                <button class="bold_btn">
                                  <i class="fa fa-bold" aria-hidden="true"></i>
                                </button>
                                <button class="italic_btn">
                                  <i
                                    class="fa fa-italic"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                <button class="underline_btn">
                                  <i
                                    class="fa fa-underline"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            id="removeSelected"
                            class="custom_btn border_btn removeSelected"
                          >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-image"
                      role="tabpanel"
                      aria-labelledby="pills-image-tab"
                    >
                      <div class="tab_header mb-3">
                        <h2 class="text_xl font_semibold letter_spacing mb-1">
                          Add image
                        </h2>
                        <p class="text_sm letter_spacing mb-0">
                          Search for royalty free images, add images from URL’s
                          or from your assets.
                        </p>
                      </div>
                      <div class="inner_tabs">
                        <ul
                          class="nav nav-pills nav-pills align-items-end mb-4"
                          id="pills-tab"
                          role="tablist"
                        >
                        <li class="nav-item" role="presentation">
                            <button
                              class="text_sm letter_spacing font_semibold nav-link active position-relative"
                              id="pills-assets-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-assets"
                              type="button"
                              role="tab"
                              aria-controls="pills-assets"
                              aria-selected="true"
                            >
                              Assets
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="text_sm letter_spacing font_semibold nav-link position-relative"
                              id="pills-img_url-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-img_url"
                              type="button"
                              role="tab"
                              aria-controls="pills-img_url"
                              aria-selected="false"
                            >
                              Image URL
                            </button>
                          </li>
                          
                        </ul>

                        <div class="w-100" id="pills-tabContent">
                          <div
                            class="tab-pane fade "
                            id="pills-img_url"
                            role="tabpanel"
                            aria-labelledby="pills-img_url-tab"
                          >
                            <label
                              class="text_sm letter_spacing font_semibold mb-1"
                              >Use image URL</label
                            >
                            <p class="text_sm letter_spacing mb-2">
                              Please use a public image URL
                            </p>

                            <input
                              type="url"
                              id="imageUrl"
                              pattern="https://.*"
                              class="mb-2"
                              placeholder="https://picsum.photos"
                            />
                            <button
                              type="submit"
                              id="addImageFromUrl"
                              class="custom_btn color_btn"
                            >
                              Add to canvas
                            </button>
                          </div>

                          <div
                            class="tab-pane fade show active"
                            id="pills-assets"
                            role="tabpanel"
                            aria-labelledby="pills-assets-tab"
                          >
                            <label
                              class="text_sm letter_spacing font_semibold mb-1"
                              >Upload your image</label
                            >
                            <div class="fileuplad_main">
                              <div class="fileuplad_wrapper">
                                <div class="fileUpload_label">
                                  <div class="upload_icon">
                                    <i
                                      class="fa fa-cloud-upload"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <p class="text_sm letter_spacing mb-0">
                                    <span>Click to upload</span> or drag and
                                    drop SVG, PNG, JPG, GIF, or PDF
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  id="imageUploader"
                                  accept=".svg,.png,.jpg,.jpeg,.gif,.pdf"
                                />
                              </div>
                              <div id="imageList" class="image-list"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-qrcode"
                      role="tabpanel"
                      aria-labelledby="pills-qrcode-tab"
                      >
                      <div class="tab_header mb-3">
                        <h2 class="text_xl font_semibold letter_spacing mb-2">
                          Conversion tracking
                        </h2>
                        <button id="generateQR" class="custom_btn color_btn">
                          Create Dynamic QR code
                        </button>
                        <button
                          id="removeSelected"
                          class="custom_btn border_btn removeSelected removeSelectedQR" style="display:none;"
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-variable"
                      role="tabpanel"
                      aria-labelledby="pills-variable-tab"
                      >
                      <div class="tab_header mb-3">
                        <h2 class="text_xl font_semibold letter_spacing mb-1">
                          Add variable field
                        </h2>
                        <div class="inner_tabs">
                        <ul
                          class="nav nav-pills nav-pills align-items-end mb-4"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item" role="presentation">
                            <button
                              class="text_sm letter_spacing font_semibold nav-link active position-relative"
                              id="pills-var_data-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-var_data"
                              type="button"
                              role="tab"
                              aria-controls="pills-var_data"
                              aria-selected="true"
                            >
                              Variable
                            </button>
                          </li>
                          <li class="nav-item" role="presentation" style="display:none;">
                            <button
                              class="text_sm letter_spacing font_semibold nav-link position-relative"
                              id="pills-assets-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-assets"
                              type="button"
                              role="tab"
                              aria-controls="pills-assets"
                              aria-selected="false"
                            >
                              Image
                            </button>
                          </li>
                        </ul>

                        <div class="w-100" id="pills-tabContent">
                          <div
                            class="tab-pane fade show active"
                            id="pills-var_data"
                            role="tabpanel"
                            aria-labelledby="pills-var_data-tab"
                          >
                            <input
                              type="text"
                              id="search-variable"
                              class="mb-2"
                              placeholder="Search for Variable"
                            />
                            <div id="variable-details">
                              ${variableHtml}
                            </div>
                          </div>
                          <div
                            class="tab-pane fade"
                            id="pills-assets"
                            role="tabpanel"
                            aria-labelledby="pills-assets-tab"
                          >
                            <label
                              class="text_sm letter_spacing font_semibold mb-1"
                              >Upload your image</label
                            >
                            <div class="fileuplad_main">
                              <div class="fileuplad_wrapper">
                                <div class="fileUpload_label">
                                  <div class="upload_icon">
                                    <i
                                      class="fa fa-cloud-upload"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <p class="text_sm letter_spacing mb-0">
                                    <span>Click to upload</span> or drag and
                                    drop SVG, PNG, JPG, GIF, or PDF
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  id="imageUploader"
                                  accept=".svg,.png,.jpg,.jpeg,.gif,.pdf"
                                />
                              </div>
                              <div id="imageList" class="image-list"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                        <button style="display:none;">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-location"
                      role="tabpanel"
                      aria-labelledby="pills-location-tab"
                      >
                      <div class="tab_header mb-3">
                        <h2 class="text_xl font_semibold letter_spacing mb-2">
                          Dynamic Driving Map
                        </h2>
                        <button id="generateLocation" class="custom_btn color_btn">
                          Create Dynamic Direction Map
                        </button>
                        <button
                          id="removeSelected"
                          class="custom_btn border_btn removeSelected removeSelectedLocation" style="display:none;"
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 h-100 main_col" id="main-section">
            <div class="canvas_wrapper h-100">
              <div class="canvas_wrapper_header">
                <div class="switcher">
                  <div class="form-check form-switch" id="switch_btn">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                </div>
                <div class="canvas_side">Front</div>
                <div class="btn_groups">
                  <button class="custom_btn border_btn" id="save_btn">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i> Save
                  </button>
                  <button class="custom_btn color_btn" id="canva_preview">
                    <i class="fa fa-eye" aria-hidden="true"></i> View Proof
                  </button>
                </div>
              </div>
              <div id="htmlEditor" style="display: none">
                <pre><code id="htmlCode" class="language-html"></code></pre>
                <button id="downloadHtml" class="custom_btn color_btn">
                  Download HTML
                </button>
              </div>
              <div class="main-canva" id="canvasContainer">
                <canvas id="canvas" style="background-color: #fff"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      this.addCustomStyles();
      this.initializeTool();
    });
  }

  initializeTool() {
    let fabricCanvas;
    let siteVer = this.siteVersion;
    let apiKey = this.u_id;

    if (this.htmlCodeImported) {
      fabricCanvas = new fabric.Canvas("canvas", {
        selection: false,
      });
      fabricCanvas.loadFromJSON(
        this.htmlCodeImported,
        function () {
          fabricCanvas.getObjects("image").forEach(function (image) {
            console.log(image, "edit----image");
            if(image.isQR == false && image.isLocation == false){
              addImageToList(image);
            }
          });
          fabricCanvas.getObjects("text_box").forEach(function (text) {
            text.bringToFront();
          });
          const rects = fabricCanvas.getObjects("rect");
          if (rects.length > 0) {
            const firstRect = rects[0];
            firstRect.set({
              angle: 0,
              selectable: false,
              editable: false,
              lockMovementX: true,
              lockMovementY: true,
              lockScalingX: true,
              lockScalingY: true,
              lockRotation: true,
            });
            fabricCanvas.renderAll();

            if (rects.length > 1) {
              rects.forEach(function (rect, index) {
                if (index > 0) {
                  fabricCanvas.remove(rect);
                }
              });
            }
          }
          fabricCanvas.renderAll();
        }.bind(this)
      );
    } else {
      fabricCanvas = new fabric.Canvas("canvas", {
        selection: false,
      });
    }
    fabricCanvas.setHeight(600);
    fabricCanvas.setWidth(800);

    const upperCanvasElement = fabricCanvas.upperCanvasEl;
    upperCanvasElement.style.backgroundColor = "transparent";
    fabricCanvas.renderAll();

    document.querySelectorAll(".size-btn").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        document
          .querySelectorAll(".size-btn")
          .forEach((btn) => btn.classList.remove("active"));

        this.classList.add("active");
      });
    });

    document.querySelectorAll(".side-btn").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        document
          .querySelectorAll(".side-btn")
          .forEach((btn) => btn.classList.remove("active"));

        this.classList.add("active");
      });
    });

    document
      .getElementById("canva_preview")
      .addEventListener("click", function () {
        fabricCanvas.getObjects().forEach(function (object) {
          object.selectable = false;
        });

        fabricCanvas.discardActiveObject();
        fabricCanvas.renderAll();

        const sidebar = document.getElementById("sidebar");
        const mainSection = document.getElementById("main-section");

        sidebar.classList.remove("col-lg-4");
        sidebar.classList.add("col-lg-1");
        mainSection.classList.remove("col-lg-8");
        mainSection.classList.add("col-lg-11");

        document.getElementById("pills-tabContent").style.display = "none";
        document.getElementById("pills-tab").style.display = "none";
        document.getElementById("switch_btn").style.display = "none";
        document.getElementById("back_tab").style.display = "block";

        fabricCanvas.selection = false;
        fabricCanvas.off("mouse:down");
        fabricCanvas.off("mouse:up");
        fabricCanvas.off("mouse:move");
      });

    document
      .getElementById("back_tab_btn")
      .addEventListener("click", function () {
        fabricCanvas.getObjects().forEach(function (object) {
          object.selectable = true;
        });

        const sidebar = document.getElementById("sidebar");
        const mainSection = document.getElementById("main-section");

        sidebar.classList.remove("col-lg-1");
        sidebar.classList.add("col-lg-4");
        mainSection.classList.remove("col-lg-11");
        mainSection.classList.add("col-lg-8");

        document.getElementById("pills-tabContent").style.display = "block";
        document.getElementById("pills-tab").style.display = "block";
        document.getElementById("switch_btn").style.display = "block";
        document.getElementById("back_tab").style.display = "none";

        fabricCanvas.selection = true;
        fabricCanvas.on("mouse:down");
        fabricCanvas.on("mouse:up");
        fabricCanvas.on("mouse:move");
      });

    document.querySelectorAll(".add_text_btn").forEach((button) => {
      button.addEventListener("click", function () {
        const text = this.getAttribute("data-text");

        let fontSize;
        switch (text) {
          case "Heading 1":
            fontSize = 36;
            break;
          case "Heading 2":
            fontSize = 30;
            break;
          case "Heading 3":
            fontSize = 24;
            break;
          case "Paragraph":
            fontSize = 18;
            break;
          default:
            fontSize = 20;
        }
        console.log(fontSize);
        const textbox = new fabric.Textbox(text, {
          left: 10,
          top: 20,
          width: 200,
          fontSize: fontSize,
          fill: "black",
          selectable: true,
        });
        console.log(textbox);
        fabricCanvas.add(textbox);
        textbox.bringToFront();
        textbox.bringForward();
        fabricCanvas.renderAll();

        document.querySelector(".front_div").style.display = "none";
        document.querySelector(".back_div").style.display = "block";
      });
    });

    document.querySelectorAll(".add-param").forEach((button) => {
      button.addEventListener("click", function () {
        const text = this.getAttribute("data-text");
        const textbox = new fabric.Textbox(text, {
          left: 10,
          top: 20,
          width: 200,
          fontSize: 16,
          fill: "black",
          selectable: true,
          isVariable: true,
        });

        fabricCanvas.add(textbox);
        textbox.bringToFront();
        fabricCanvas.renderAll();

        document.querySelector(".front_div").style.display = "none";
        document.querySelector(".back_div").style.display = "block";
      });
    });

    document
      .getElementById("fontFamily")
      .addEventListener("change", function () {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === "textbox") {
          activeObject.set("fontFamily", this.value);
          fabricCanvas.renderAll();
        }
      });

    document.querySelectorAll(".text_weight button").forEach((button) => {
      button.addEventListener("click", function () {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === "textbox") {
          const buttonClass = this.className.split("_")[0];

          switch (buttonClass) {
            case "bold":
              const isBold = activeObject.fontWeight === "bold";
              activeObject.set({ fontWeight: isBold ? "300" : "bold" });
              this.classList.toggle("active", !isBold);
              break;
            case "italic":
              const isItalic = activeObject.fontStyle === "italic";
              activeObject.set({
                fontStyle: isItalic ? "normal" : "italic",
              });
              this.classList.toggle("active", !isItalic);
              break;
            case "underline":
              const isUnderline = activeObject.underline;
              activeObject.set({ underline: !isUnderline });
              this.classList.toggle("active", !isUnderline);
              break;
          }
          fabricCanvas.renderAll();
        }
      });
    });

    document
      .getElementById("fontWeight")
      .addEventListener("change", function () {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === "textbox") {
          activeObject.set("fontWeight", this.value);
          fabricCanvas.renderAll();
        }
      });

    document.getElementById("fontSize").addEventListener("keyup", function () {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        const fontSize = this.value || 20;
        activeObject.set({ fontSize: parseInt(fontSize, 10) });
        fabricCanvas.renderAll();
      }
    });

    document.getElementById("favcolor").addEventListener("change", function () {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        const color = this.value;
        activeObject.set({ fill: color });
        fabricCanvas.renderAll();
      }
    });

    document.querySelectorAll(".text-align button").forEach((button) => {
      button.addEventListener("click", function () {
        document
          .querySelectorAll(".text-align button")
          .forEach((btn) => btn.classList.remove("active"));

        this.classList.add("active");

        const alignment = this.className.split("_")[0];

        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === "textbox") {
          activeObject.set({ textAlign: alignment });
          fabricCanvas.renderAll();
        }
      });
    });

    document
      .getElementById("back_btn")
      .addEventListener("click", function (event) {
        event.preventDefault();

        document.querySelector(".front_div").style.display = "block";
        document.querySelector(".back_div").style.display = "none";
      });

    let height;
    let width;
    let side;

    // document
    //   .querySelector(".next_btn")
    //   .addEventListener("click", function (event) {
    //     event.preventDefault();
    const activeButton = document.querySelector(".size-btn.active");
    const sideButton = document.querySelector(".side-btn.active");

    let rect;

    function addRectangle(height, width) {
      const canvasWidth = width;
      const canvasHeight = height;

      console.log("canvasWidth :", canvasWidth);
      console.log("canvasHeight :", canvasHeight);

      const rectWidth = 325;
      const rectHeight = 212;

      const rectLeft = canvasWidth - rectWidth;
      const rectTop = canvasHeight - rectHeight;

      rect = new fabric.Rect({
        top: rectTop,
        left: rectLeft,
        fill: "#ffffffad",
        // fill: "red",
        angle: 0,
        width: rectWidth,
        height: rectHeight,
        selectable: false,
        editable: false,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
      });
      fabricCanvas.add(rect);
      rect.bringToFront();
      fabricCanvas.renderAll();

      fabricCanvas.on("object:added", function (event) {
        if (rect) {
          rect.bringToFront();
          fabricCanvas.renderAll();
          // fabricCanvas.preserveObjectStacking(true);
        }
      });
      fabricCanvas.on("selection:created", function (event) {
        if (rect) {
          rect.bringToFront();
          fabricCanvas.renderAll();
        }
      });

      fabricCanvas.on("selection:cleared", function (event) {
        if (rect) {
          rect.bringToFront();
          fabricCanvas.renderAll();
        }
      });
    }

    if (activeButton) {
      // height = activeButton.getAttribute("data-height");
      height = this.posterHeight;
      width = this.posterWidth;
      // width = activeButton.getAttribute("data-width");
      side = this.posterSide;
      // side = sideButton.getAttribute("data-side");
      document.querySelector(".canvas_side").innerHTML = side;
      // document.querySelector(".create_artwork_wrapper").style.display =
      //   "none";

      const canvaView = document.querySelector(".canva-view");
      canvaView.style.display = "flex";

      function adjustCanvasSize() {
        const canvasContainer = document.getElementById("canvasContainer");
        let divWidth = canvasContainer.offsetWidth;
        let divHeight = canvasContainer.offsetHeight;

        let canvasWidth = width * 96;
        let canvasHeight = height * 96;

        let scaleFactor = 1;

        if (canvasWidth > divWidth || canvasHeight > divHeight) {
          const widthScale = divWidth / canvasWidth;
          const heightScale = divHeight / canvasHeight;
          scaleFactor = Math.min(widthScale, heightScale);
          scaleFactor *= 0.88;
          console.log("Scale factor: ", scaleFactor);
        }

        fabricCanvas.setWidth(canvasWidth * scaleFactor);
        fabricCanvas.setHeight(canvasHeight * scaleFactor);

        fabricCanvas.setZoom(scaleFactor);

        if (side === "Back") {
          addRectangle(canvasHeight, canvasWidth);
        }

        fabricCanvas.renderAll();
      }

      adjustCanvasSize();
      window.addEventListener("resize", adjustCanvasSize);
    } else {
      console.log("No active button selected.");
    }

    function generateRandomString(length) {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
      }
      return randomString;
    }

    async function shortenImageUrl(dataUrl, callback, siteVersion, apiKey) {
      const imageData = await dataURLToBlob(dataUrl);
      const randomFileName = generateRandomString(10);
      const file = new File([imageData], randomFileName + "-image.png", {
        type: imageData.type,
      });
      let endpoint;
      if (siteVersion == "yes") {
        endpoint = "https://app.movermailers.com/version-test/fileUpload/";
      } else {
        endpoint = "https://app.movermailers.com/fileUpload";
      }
      const formData = new FormData();
      formData.append("file", file);

      fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let shortUrl = data;
          if (shortUrl.startsWith("//")) {
            shortUrl = "https:" + shortUrl;
          }
          callback(shortUrl);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while shortening the image URL.");
        });
    }

    // document
    //   .getElementById("generateQR")
    //   .addEventListener("click", function (event) {
    //     event.preventDefault();
    //     const qrText = "https://app.movermailers.com/version-test/test";

    //     const qr = new QRCode(document.createElement("div"), {
    //       text: qrText,
    //       width: 100,
    //       height: 100,
    //     });
    //     const qrCanvas = qr._oDrawing._elCanvas;
    //     const qrDataUrl = qrCanvas.toDataURL("image/png");

    //     shortenImageUrl(
    //       qrText,
    //       function (shortUrl) {
    //         fabric.Image.fromURL(
    //           shortUrl,
    //           function (img) {
    //             img.set({
    //               left: 50,
    //               top: 50,
    //               selectable: true,
    //               isQR: true,
    //               scaledWidth: img.width,
    //               scaledHeight: img.height,
    //             });
    //             fabricCanvas.add(img);
    //             img.bringToFront();
    //             fabricCanvas.renderAll();

    //             img.on("scaled", function () {
    //               img.set({
    //                 scaledWidth: img.getScaledWidth(),
    //                 scaledHeight: img.getScaledHeight(),
    //               });
    //             });

    //             img.on("modified", function () {
    //               img.set({
    //                 scaledWidth: img.getScaledWidth(),
    //                 scaledHeight: img.getScaledHeight(),
    //               });
    //             });
    //           },
    //           { crossOrigin: "Anonymous" }
    //         );
    //       },
    //       siteVer,
    //       apiKey
    //     );

    //     let deleteBtn = document.getElementsByClassName("removeSelectedQR")[0];

    //     if (qrCanvas) {
    //       deleteBtn.style.display = "block";
    //     } else {
    //       deleteBtn.style.display = "none";
    //     }
    //   });

    function handleTextSelection(activeObject) {
      if (activeObject.type === "textbox") {
        console.log(activeObject.fontWeight, activeObject.fontFamily);
        document.getElementById("fontSize").value = activeObject.fontSize;

        document.getElementById("fontFamily").value =
          activeObject.fontFamily || "Arial";

        const fontWeight = activeObject.fontWeight;
        if (fontWeight == "normal") {
          document.getElementById("fontWeight").value = "300";
        } else {
          document.getElementById("fontWeight").value = fontWeight;
        }

        const alignmentButtons =
          document.querySelectorAll(".text-align button");
        alignmentButtons.forEach((button) => button.classList.remove("active"));
        const alignment = activeObject.textAlign || "left";
        document
          .querySelector(`.text-align .${alignment}_align`)
          .classList.add("active");

        document
          .querySelector(".text_weight .bold_btn")
          .classList.toggle("active", activeObject.fontWeight === "bold");
        document
          .querySelector(".text_weight .italic_btn")
          .classList.toggle("active", activeObject.fontStyle === "italic");
        document
          .querySelector(".text_weight .underline_btn")
          .classList.toggle("active", !!activeObject.underline);

        document.getElementById("favcolor").value = activeObject.fill || "#000";
      }
    }

    document.querySelectorAll(".removeSelected").forEach((button) => {
      button.addEventListener("click", function () {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type !== "rect") {
          fabricCanvas.remove(activeObject);
        }
        if (this.classList.contains("removeSelectedQR")) {
          this.style.display = "none";
        }
        if (this.classList.contains("removeSelectedLocation")) {
          this.style.display = "none";
        }
      });
    });

    function handleSelectionEvent(e) {
      const activeObject = e.target;
      console.log("activeObject", activeObject);
      if (activeObject) {
        if (activeObject.type === "image") {
          if (activeObject.isQR) {
            document.getElementById("pills-qrcode-tab").click();
            let deleteBtn = document.getElementsByClassName("removeSelectedQR")[0];
            deleteBtn.style.display = "block";
          } else if (activeObject.isLocation) {
            document.getElementById("pills-location-tab").click();
            let deleteBtnLocation = document.getElementsByClassName("removeSelectedLocation")[0];
            deleteBtnLocation.style.display = "block";
          } else {
            document.getElementById("pills-image-tab").click();
          }
        } else if (activeObject.type === "textbox") {
          document.getElementById("pills-text-tab").click();

          document.querySelector(".front_div").style.display = "none";
          document.querySelector(".back_div").style.display = "block";

          handleTextSelection(activeObject);
        }
      }
    }

    fabricCanvas.on("selection:created", handleSelectionEvent);
    fabricCanvas.on("selection:updated", handleSelectionEvent);

    function addImageToCanvas(dataUrl, isQR, isLocation) {
      if(isQR != true){
        isQR = false;
      }
      if(isLocation != true){
        isLocation = false;
      }        
      fabric.Image.fromURL(
        dataUrl,
        function (img) {
          const canvasWidth = fabricCanvas.width;
          const canvasHeight = fabricCanvas.height;
          const imgWidth = img.width;
          const imgHeight = img.height;
          let scaleFactor = 1;
          scaleFactor = Math.min(
            canvasWidth / imgWidth,
            canvasHeight / imgHeight
          );
          scaleFactor *= 0.88;
          const scaledWidth = imgWidth * scaleFactor;
          const scaledHeight = imgHeight * scaleFactor;
            img.set({
              left: 0,
              top: 0,
              scaleX: scaleFactor,
              scaleY: scaleFactor,
              selectable: true,
              scaledWidth: scaledWidth,
              scaledHeight: scaledHeight,
              isQR: isQR,
              isLocation: isLocation
            });          
          fabricCanvas.add(img);
          img.bringToFront();
          fabricCanvas.renderAll();
          if (isQR !== true && isLocation !== true) {
            addImageToList(img);
          }

          img.on("scaled", function () {
            img.set({
              scaledWidth: img.getScaledWidth(),
              scaledHeight: img.getScaledHeight(),
            });
            fabricCanvas.renderAll();
          });

          img.on("modified", function () {
            img.set({
              scaledWidth: img.getScaledWidth(),
              scaledHeight: img.getScaledHeight(),
            });
            fabricCanvas.renderAll();
          });
        },
        { crossOrigin: "anonymous" }
      );
    }

    function addImageToList(img) {
      const imageList = document.getElementById("imageList");

      const imageItem = document.createElement("div");
      imageItem.classList.add("image-item");
      imageItem.dataset.id = img.id;

      const imageElement = document.createElement("img");
      imageElement.src = img.getSrc();
      imageItem.appendChild(imageElement);

      const trashButton = document.createElement("button");
      let uploader_input = document.getElementById("imageUploader");
      trashButton.classList.add("trash-button");
      trashButton.innerHTML = "&times;";
      trashButton.addEventListener("click", function () {
        fabricCanvas.remove(img); //change
        uploader_input.value = "";
        imageList.removeChild(imageItem);
      });

      imageItem.appendChild(trashButton);
      imageList.appendChild(imageItem);
    }

    document
      .getElementById("imageUploader")
      .addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
          const dataUrl = e.target.result;
          shortenImageUrl(
            dataUrl,
            function (shortUrl) {
              addImageToCanvas(shortUrl);
            },
            siteVer,
            apiKey
          );
        };

        reader.readAsDataURL(file);
      });

    document
      .getElementById("addImageFromUrl")
      .addEventListener("click", function (event) {
        event.preventDefault();

        const imageUrl = document.getElementById("imageUrl").value;

        if (!imageUrl) {
          alert("Please enter a valid URL.");
          return;
        }
        shortenImageUrl(
          imageUrl,
          function (shortUrl) {
            addImageToCanvas(shortUrl);
          },
          siteVer,
          apiKey
        );
      });


      //onAddQRCode
      document
      .getElementById("generateQR")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const imageUrl = "https://app.movermailers.com/version-test/test";

        let deleteBtn = document.getElementsByClassName("removeSelectedQR")[0];
        let isQR = true;
        let isLocation = false;

        if (imageUrl) {
          deleteBtn.style.display = "block";
        } else {
          deleteBtn.style.display = "none";
        }

        addImageToCanvas(imageUrl, isQR, isLocation);

      });

      document
      .getElementById("generateLocation")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const imageUrl = "https://app.movermailers.com/version-test/location";

        let deleteBtnLocation = document.getElementsByClassName("removeSelectedLocation")[0];
        let isQR = false;
        let isLocation = true;

        if (imageUrl) {
          deleteBtnLocation.style.display = "block";
        } else {
          deleteBtnLocation.style.display = "none";
        }

        addImageToCanvas(imageUrl, isQR, isLocation);

      });

      fabric.Image.prototype.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            isQR: this.isQR || false,
            isLocation: this.isLocation || false,
            scaledWidth: this.scaledWidth || this.width * this.scaleX,
            scaledHeight: this.scaledHeight || this.height * this.scaleY,
          });
        };
      })(fabric.Image.prototype.toObject);  

    const saveBtn = document.getElementById("save_btn");

    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        localStorage.setItem('isSaveInProgress', true );
        
        if (typeof fabricCanvas === "undefined") {
          return;
        }

        fabricCanvas.getObjects("text").forEach((textObj) => {
          fabricCanvas.bringToFront(textObj);
          fabricCanvas.renderAll();
        });

        var savedCanvasJSON;
        const htmlContent = convertCanvasToHTML(fabricCanvas);
        const htmlCodeElement = document.getElementById("htmlCode");

        htmlCodeElement.textContent = htmlContent;
        Prism.highlightElement(htmlCodeElement);
        fabricCanvas.discardActiveObject();
        savedCanvasJSON = JSON.stringify(fabricCanvas.toJSON());

        const saveImageToBubble = (dataURL) => {
          if (!dataURL) {
            return null;
          }
          const byteString = atob(dataURL.split(",")[1]);
          const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: mimeString });
        };

        const dataURL = fabricCanvas.toDataURL({ format: "png" });
        const imageBlob = saveImageToBubble(dataURL);

        if (imageBlob) {
          const file = new File([imageBlob], "image.png", {
            type: imageBlob.type,
          });
          uploadImageToBubble(
            file,
            htmlContent,
            savedCanvasJSON,
            siteVer,
            apiKey
          );
          console.log("Upload successful");

        } else {
          console.error("Failed to create image blob.");
        }
      });
    } else {
      console.error("Save button not found.");
    }

    window.addEventListener("beforeunload", function (event) {
      const isSaveInProgress = localStorage.getItem('isSaveInProgress');

        console.log("isSaveInProgress:", isSaveInProgress);

      if (fabricCanvas.getObjects().length > 0 && isSaveInProgress != true) {
        event.preventDefault();
        event.returnValue =
          "Are you sure you want to leave? Changes you made may not be saved.";
        localStorage.removeItem('isSaveInProgress');
      }
    });

    const dataURLToBlob = async (dataURL) => {
      if (!dataURL) {
        return null;
      }
      if (dataURL.startsWith("data:")) {
        const byteString = atob(dataURL.split(",")[1]);
        const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
      } else {
        try {
          const response = await fetch(dataURL);
          const mimeType =
            response.headers.get("Content-Type") || "application/octet-stream";
          const blob = await response.blob();

          return new Blob([blob], { type: mimeType });
        } catch (error) {
          console.error("Failed to fetch image:", error);
          return null;
        }
      }
    };

    function uploadImageToBubble(
      file,
      htmlContent,
      saveCanvasHtml,
      siteVer,
      apiKey
    ) {
      if (!file) {
        return console.log("no file found");
      }
      let endpoint;
      if (siteVer == "yes") {
        endpoint = "https://app.movermailers.com/version-test/fileUpload";
      } else {
        endpoint = "https://app.movermailers.com/fileUpload";
      }
      const formData = new FormData();
      formData.append("file", file);
      fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          bubble_fn_saveData({
            value: data,
            output1: htmlContent,
            output2: saveCanvasHtml,
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }

    document
      .getElementById("flexSwitchCheckDefault")
      .addEventListener("change", function () {
        const canvasContainer = document.getElementById("canvasContainer");
        const pillsTabContent = document.getElementById("pills-tabContent");
        const htmlEditor = document.getElementById("htmlEditor");
        const sidebar = document.getElementById("sidebar");
        const mainSection = document.getElementById("main-section");

        if (this.checked) {
          canvasContainer.style.display = "none";
          pillsTabContent.style.display = "none";
          htmlEditor.style.display = "block";

          sidebar.classList.remove("col-lg-4");
          sidebar.classList.add("col-lg-1");
          mainSection.classList.remove("col-lg-8");
          mainSection.classList.add("col-lg-11");

          var btn = document.getElementById("canva_preview");
          btn.disabled = true;

          const htmlContent = convertCanvasToHTML(fabricCanvas);
          const htmlCodeElement = document.getElementById("htmlCode");
          htmlCodeElement.textContent = htmlContent;

          Prism.highlightElement(htmlCodeElement);
        } else {
          canvasContainer.style.display = "flex";
          pillsTabContent.style.display = "block";
          htmlEditor.style.display = "none";

          sidebar.classList.remove("col-lg-1");
          sidebar.classList.add("col-lg-4");
          mainSection.classList.remove("col-lg-11");
          mainSection.classList.add("col-lg-8");

          var btn = document.getElementById("canva_preview");
          btn.disabled = false;
        }
      });

    // const canvasContainer = document.querySelector(".canvas-container");
    // document.addEventListener("mousedown", function (event) {
    //   if (!canvasContainer.contains(event.target)) {
    //     const activeObject = fabricCanvas.getActiveObject();
    //     if (
    //       activeObject &&
    //       activeObject.type === "image" &&
    //       activeObject.isQR === false
    //     ) {
    //       fabricCanvas.sendToBack(activeObject);
    //       fabricCanvas.sendBackwards(activeObject);
    //       fabricCanvas.discardActiveObject();
    //       fabricCanvas.renderAll();
    //     }else if(activeObject && activeObject.type === "textbox" ){
    //       fabricCanvas.bringToFront(activeObject);
    //       fabricCanvas.renderAll();
    //     }
    //   }
    // });
    const canvasContainer = document.querySelector(".canvas-container");
    document.addEventListener("mousedown", function (event) {
      if (!canvasContainer.contains(event.target)) {
        const activeObject = fabricCanvas.getActiveObject();

        if (activeObject && activeObject.type === "image" && activeObject.isQR === false && activeObject.isLocation === false) {
          fabricCanvas.sendToBack(activeObject);
          fabricCanvas.sendBackwards(activeObject);
          fabricCanvas.discardActiveObject();
          fabricCanvas.renderAll();
        } else if (activeObject && activeObject.type === "textbox") {
          fabricCanvas.bringToFront(activeObject);
          fabricCanvas.renderAll();
        }
      } else {
        if (!fabricCanvas.getActiveObject()) {
          fabricCanvas.getObjects("textbox").forEach(function (textObj) {
            fabricCanvas.bringToFront(textObj);
          });
          fabricCanvas.renderAll();
        }
      }
    });


    fabricCanvas.on("mouse:down", function (event) {
      if (event.target) {
        fabricCanvas.setActiveObject(event.target);
      }
    });

    function convertCanvasToHTML(canvas) {
      let bodyContent = "";
      let styles = [];

      canvas.getObjects().forEach((obj, index) => {
        console.log(obj ,"--- all")
        if (obj.type === "textbox") {
          bodyContent += `<div class="textbox-${index}">
                      <p>${obj.text}</p>
                      </div>\n`;
          styles.push(
            `.textbox-${index} p { position: absolute; left: ${obj.left}px; top: ${obj.top}px; width: ${obj.width}px; font-size: ${obj.fontSize}px; font-weight:${obj.fontWeight}; color:${obj.fill}; font-family: ${obj.fontFamily}; margin: 0px; }`
          );
        } else if (obj.type === "image" && obj.isQR == false && obj.isLocation == false) {
          bodyContent += `<img class="image-${index}" src="${obj.getSrc()}">\n`;
          styles.push(
            `.image-${index} { position: absolute; left: ${obj.left}px; top: ${obj.top}px; width: ${obj.scaledWidth}px; height: ${obj.scaledHeight}px; }`
          );
        } else if (obj.type === "image" && obj.isQR == true) {
          
          bodyContent += `<img class="image-${index} type-qr" src="${obj.getSrc()}">\n`;
          styles.push(
            `.image-${index} { position: absolute; left: ${obj.left}px; top: ${obj.top}px; width: ${obj.scaledWidth}px; height: ${obj.scaledHeight}px; }`
          );
        }else if (obj.type === "image" && obj.isLocation == true) {
          
          bodyContent += `<img class="image-${index} type-location directions-image" src="${obj.getSrc()}">\n`;
          styles.push(
            `.image-${index} { position: absolute; left: ${obj.left}px; top: ${obj.top}px; width: ${obj.scaledWidth}px; height: ${obj.scaledHeight}px; }`
          );
        } else if (obj.type === "rect") {
          bodyContent += `<div class="rect-${index}"></div>\n`;
          styles.push(
            `.rect-${index} { position: absolute; left: ${obj.left}px; top: ${obj.top}px; width: ${obj.width}px; height: ${obj.height}px; background-color: ${obj.fill}; }`
          );
        }
      });

      const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Designer Tool</title>
          <style>
              body { margin: 0; padding: 0; position: relative; }
              #canvas-${side} { position:relative; width:${width}in; height:${height}in; background-color:white; margin: 0; padding: 0;}
              ${styles.join("\n")}
          </style>
      </head>
      <body>
          <div id="canvas-${side}" style="overflow:hidden;">
          ${bodyContent}
          </div>
      </body>
      </html>
          `;
      return fullHtml.trim();
    }

    document
      .getElementById("downloadHtml")
      .addEventListener("click", function () {
        const htmlCode = document.getElementById("htmlCode").textContent;
        downloadHTMLFile(htmlCode, "canvas.html");
      });

    function downloadHTMLFile(content, filename) {
      const element = document.createElement("a");
      const file = new Blob([content], { type: "text/html" });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
}

// Usage:
// <script src="https://abulhasanHZtech.github.io/myLibrary/myLibrary.min.js"></script>
// <script>
//   document.addEventListener('DOMContentLoaded', function() {
//     new DesignerTool('your-div-id');
//   });
// </script>

// this is for creating (.min.js) file:
// npx uglify-js myLibrary.js -o myLibrary.min.js
