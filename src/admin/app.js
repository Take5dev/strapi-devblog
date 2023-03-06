import Take5Logo from "./extensions/logo.svg";
import Take5Favicon from "./extensions/favicon.ico";

const myPrimaryColor = "#fb0000";

const config = {
  locales: ['ru', 'de', 'it'],
  auth: {
    logo: Take5Logo
  },
  menu: {
    logo: Take5Logo
  },
  head: {
    favicon: Take5Favicon
  },
  theme: {
    colors: {
      buttonPrimary500: myPrimaryColor,
      primary500: myPrimaryColor
    }
  }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
