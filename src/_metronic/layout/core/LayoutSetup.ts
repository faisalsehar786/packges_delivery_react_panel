import {
  IAside,
  IContent,
  IFooter,
  IHeader,
  IToolbar,
  ILayout,
  ILayoutCSSClasses,
  ILayoutHTMLAttributes,
  ILayoutCSSVariables,
  IPageTitle,
} from "./LayoutModels";
import { DefaultLayoutConfig } from "./DefaultLayoutConfig";

const LAYOUT_CONFIG_KEY = "metronic-react-demo3-8037" || "LayoutConfig";

export function getLayout(): ILayout {
  const ls = localStorage.getItem(LAYOUT_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls) as ILayout;
    } catch (er) {
      console.error(er);
    }
  }
  return DefaultLayoutConfig;
}

function setLayout(config: ILayout): void {
  try {
    localStorage.setItem(LAYOUT_CONFIG_KEY, JSON.stringify(config));
  } catch (er) {
    console.error(er);
  }
}

export function getEmptyCssClasses() {
  return {
    header: [],
    headerContainer: [],
    headerMobile: [],
    headerMenu: [],
    aside: [],
    asideMenu: [],
    asideToggle: [],
    toolbar: [],
    toolbarContainer: [],
    content: [],
    contentContainer: [],
    footerContainer: [],
    sidebar: [],
    pageTitle: [],
  };
}

export function getEmptyHTMLAttributes() {
  return {
    asideMenu: new Map(),
    headerMobile: new Map(),
    headerMenu: new Map(),
    headerContainer: new Map(),
    pageTitle: new Map(),
  };
}

export function getEmptyCSSVariables() {
  return {
    body: new Map(),
  };
}

export class LayoutSetup {
  public static isLoaded: boolean = false;
  public static config: ILayout = getLayout();
  public static classes: ILayoutCSSClasses = getEmptyCssClasses();
  public static attributes: ILayoutHTMLAttributes = getEmptyHTMLAttributes();
  public static cssVariables: ILayoutCSSVariables = getEmptyCSSVariables();

  private static initCSSClasses(): void {
    LayoutSetup.classes = getEmptyCssClasses();
  }

  private static initHTMLAttributes(): void {
    LayoutSetup.attributes = Object.assign({}, getEmptyHTMLAttributes());
  }

  private static initCSSVariables(): void {
    LayoutSetup.cssVariables = getEmptyCSSVariables();
  }

  private static initLayout(config: ILayout): void {}

  private static initHeader(config: IHeader): void {
    LayoutSetup.classes.headerContainer.push(
      config.width === "fluid" ? "container-fluid" : "container-fluid"
    );

    if (config.fixed.desktop) {
      document.body.classList.add("header-fixed");
    }

    if (config.fixed.tabletAndMobile) {
      document.body.classList.add("header-tablet-and-mobile-fixed");
    }
  }

  private static initToolbar(config: IToolbar): void {}

  private static initPageTitle(config: IPageTitle): void {}

  private static initContent(config: IContent): void {
    LayoutSetup.classes.contentContainer.push(
      config.width === "fluid" ? "container-fluid" : "container-fluid"
    );
  }

  private static initAside(config: IAside): void {
    // Fixed aside
    if (config.fixed) {
      document.body.classList.add("aside-fixed");
    }

    // Default minimized
    if (config.minimized) {
      document.body.setAttribute("data-kt-aside-minimize", "on");
      LayoutSetup.classes.asideToggle.push("active");
    }

    // Aside secondary
    if (config.secondaryDisplay) {
      document.body.classList.add("aside-secondary-enabled");
    } else {
      document.body.classList.add("aside-secondary-enabled");
    }
  }

  private static initAsideMenu(config: IAside): void {}

  private static initFooter(config: IFooter): void {
    LayoutSetup.classes.footerContainer.push(
      `container-${config.width === "fluid" ? "fluid" : "fluid"}`
    );
  }

  private static initConfig(config: ILayout): void {
    if (config.main?.darkSkinEnabled) {
      document.body.classList.add("dark-skin");
    }

    // Init layout
    LayoutSetup.initLayout(config);
    if (config.main?.type !== "default") {
      return;
    }

    LayoutSetup.initHeader(config.header);
    LayoutSetup.initPageTitle(config.pageTitle as IPageTitle);
    LayoutSetup.initToolbar(config.toolbar);
    LayoutSetup.initContent(config.content);
    LayoutSetup.initAside(config.aside);
    LayoutSetup.initFooter(config.footer);
    LayoutSetup.initAsideMenu(config.aside);
  }

  public static updatePartialConfig(fieldsToUpdate: Partial<ILayout>): ILayout {
    const config = LayoutSetup.config;
    const updatedConfig = { ...config, ...fieldsToUpdate };
    LayoutSetup.initCSSClasses();
    LayoutSetup.initCSSVariables();
    LayoutSetup.initHTMLAttributes();
    LayoutSetup.isLoaded = false;
    LayoutSetup.config = updatedConfig;
    LayoutSetup.initConfig(Object.assign({}, updatedConfig));
    LayoutSetup.isLoaded = true; // remove loading there
    return updatedConfig;
  }

  public static setConfig(config: ILayout): void {
    setLayout(config);
  }

  public static bootstrap = (() => {
    LayoutSetup.updatePartialConfig(LayoutSetup.config);
  })();
}
