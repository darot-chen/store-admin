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
      key: 'divider'
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "dashboard"
        },
        { default: () => "Dashboard" },
      ),
      key: "dashboard",
      icon: renderIcon(GridIcon)
    },
    {
      label: "Products",
      children: [
        {
          label: () => h(
            RouterLink,
            {
              to: "products"
            },
            { default: () => "Products List" },
          ),
          key: 'products'
        },
        {
          label: () => h(
            RouterLink,
            {
              to: "new"
            },
            { default: () => "Add Product" },
          ),
          key: 'add-product'
        },
        {
          label: () => h(
            RouterLink,
            {
              to: "products"
            },
            { default: () => "Category" },
          ),
          key: 'category'

        },
        {
          label: () => h(
            RouterLink,
            {
              to: "products"
            },
            { default: () => "Brand" },
          ),
          key: 'brand'
        },
      ],
      key: "products",
      icon: renderIcon(ProductsIcon)
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "/order"
        },
        { default: () => "Order" },
      ),
      key: "order",
      icon: renderIcon(CartIcon)
    },
    {
      label: () => h(
        RouterLink,
        {
          to: "/customers"
        },
        { default: () => "Customer" },
      ),
      key: "users",
      icon: renderIcon(CustomerIcon)
    },
  ];
}