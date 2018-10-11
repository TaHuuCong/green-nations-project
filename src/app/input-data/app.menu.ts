import { MenuItem } from '../../fw/services/menu.service';

export let initialMenuItems: Array<MenuItem> = [
  {
    text: 'Dashboard',
    icon: 'fa-dashboard',
    route: 'authenticated/dashboard',
    submenu: null
  },
  {
    text: 'Countries',
    icon: 'fa-flag',
    route: null,
    submenu: [
      {
        text: 'Select',
        icon: 'fa-caret-square-o-right',
        route: null,
        submenu: [
          {
            text: 'USA',
            icon: 'fa-flag',
            route: 'authenticated/country-detail/USA',
            submenu: null
          },
          {
            text: 'Japan',
            icon: 'fa-flag',
            route: 'authenticated/country-detail/Japan',
            submenu: null
          },
          {
            text: 'VN',
            icon: 'fa-flag',
            route: 'authenticated/country-detail/VN',
            submenu: null
          }
        ]
      },
      {
        text: 'Top 3',
        icon: 'fa-flag',
        route: 'authenticated/country-list/3',
        submenu: null
      },
      {
        text: 'Top 10',
        icon: 'fa-flag',
        route: 'authenticated/country-list/10',
        submenu: null
      },
      {
        text: 'All',
        icon: 'fa-flag',
        route: 'authenticated/country-list/0',
        submenu: null
      }
    ],
  },
  {
    text: 'Maintenance',
    icon: 'fa-wrench',
    route: null,
      submenu: [
        {
          text: 'Country List',
          icon: 'fa-th-list',
          route: 'authenticated/country-maint',
          submenu: null
        },
        {
          text: 'Settings',
          icon: 'fa-cog',
          route: 'authenticated/settings',
          submenu: null
        }
      ]
  }
];
