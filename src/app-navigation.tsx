export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Chat',
    path: '/chat',
    icon: 'chat'
  },
  {
    text: 'Gallery',
    path: '/gallery',
    icon: 'image'
  },
  {
    text: 'Map',
    path: '/map',
    icon: 'map'
  },
  {
    text: 'Table',
    icon: 'inserttable',
    hint: 'Table',
    items: [
      {
        text: 'Employees',
        path: '/employee-table'
      },
      {
        text: 'Company',
        path: '/company-table'
      },
      {
        text: 'Company-Employee',
        path: '/company-employee-table'
      }
    ]
  },
  {
    text: 'Html Editor',
    path: '/html-editor',
    icon: 'textdocument'
  },
  {
    text: 'Tile View',
    path: '/tile',
    icon: 'textdocument'
  },
  {
    text: 'Text Box',
    path: '/text-box',
    icon: 'textdocument'
  },
  {
    text: 'File Manager',
    path: '/file-manager',
    icon: 'folder'
  },
  {
    text: 'Accordion',
    path: '/accordion',
    icon: 'textdocument'
  },
  {
    text: 'Validator',
    icon: 'todo',
    items: [
      {
        text: 'Text',
        path: '/validator/text'
      },
      {
        text: 'Form',
        path: '/validator/form'
      }
    ]
  },
  {
    text: 'Examples',
    icon: 'variable',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      }
    ]
  }
];
