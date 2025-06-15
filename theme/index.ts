"use client";

import { theme } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import { presetDarkPalettes } from "@ant-design/colors";

const { defaultAlgorithm } = theme;

export const customTheme: ThemeConfig = {
  ...theme,
  token: {
    ...theme.defaultConfig.token,
    colorPrimary: "#095F59",
    colorError: presetDarkPalettes.red[6],
  },

  components: {
    Layout: {
      headerBg: "#fff",
      paddingMD: 40,
      //   headerPadding: "0 400 0 0",
    },
    Menu: {
      fontSize: 18,
      itemColor: "#095f59",
    },
    Button: {
      controlHeightLG: 43,
      borderRadiusLG: 8,
      boxShadow: "none",
      fontSizeLG: 14,
      fontWeight: 700,
      fontFamily: "var(--font-inter)",
      controlHeight: 36,
      colorLink: "#095F59",
    },
    Input: {
      controlHeightLG: 43,
      paddingInlineLG: 14,
      fontSizeLG: 12,
      fontFamily: "var(--font-inter)",
      fontSize: 12,
      paddingInline: 12,
      borderRadius: 8,
      borderRadiusLG: 8,
      controlHeight: 36,
    },
    Select: {
      controlHeightLG: 43,
      paddingContentHorizontalLG: 14,
      fontSizeLG: 12,
      fontFamily: "var(--font-inter)",
      fontSize: 12,
      controlPaddingHorizontal: 12,
      borderRadius: 8,
      borderRadiusLG: 8,
      controlHeight: 36,
      optionSelectedBg: "#EFFCF6",
    },

    Form: {
      labelFontSize: 12,
      colorTextLabel: "#5C5C5C",
      labelHeight: 12,
    },
  },

  algorithm: defaultAlgorithm,
};
