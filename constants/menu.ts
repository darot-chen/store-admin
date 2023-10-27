import { renderIcon } from "~/utils/render-elements";

import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  Grid as GridIcon,
  FileTray as ProductsIcon,
  Cart as CartIcon,
  People as CustomerIcon,
} from "@vicons/ionicons5";

export const getMenuItems = () :MenuOption[] => {
  return [
    {
      type: 'divider',
      key: 'divider-1'
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "/"
        },
        { default: () => "Dashboard" },
      ),
      key: "go-back-dashboard",
      icon: renderIcon(GridIcon)
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "/"
        },
        { default: () => "Products" },
      ),
      children: [
        {
          label: "Add Product",
        },
        {
          label: "Product List",
        },
        {
          label: "Category",
        },
        {
          label: "Brand",
        },
      ],
      key: "go-back-home",
      icon: renderIcon(ProductsIcon)
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "/"
        },
        { default: () => "Order" },
      ),
      key: "go-back-home",
      icon: renderIcon(CartIcon)
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "/"
        },
        { default: () => "Customer" },
      ),
      key: "go-back-home",
      icon: renderIcon(CustomerIcon)
    },
  ];
}