export default [
  {
    title: 'Home',
    to: 'home',
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-layout-dashboard' },
    children: [
      {
        title: 'Activities',
        to: 'activities',
      },
      {
        title: 'Statistics',
        to: 'statistics',
      },
      {
        title: 'Analytics',
        to: 'analytics',
      },
    ],
  },
  {
    title: 'Reports',
    icon: { icon: 'tabler-file-report' },
    children: [
      {
        title: 'Member Activity',
        to: 'member-activity',
      },
      {
        title: 'Occupant Activity',
        to: 'occupant-activity',
      },
    ],
  },

  //SECTION TOOLS & OPTIONS
  { heading: 'tools & options' },
  {
    title: 'Management',
    to: 'management',
    icon: { icon: 'tabler-hierarchy-2' },
  },
  {
    title: 'Options',
    icon: { icon: 'tabler-settings' },
    children: [
      {
        title: 'Person',
        children: [
          {
            title: 'Role',
            to: 'role',
          },
        ],
      },
    ],
  },

  //SECTION APP ACTIVITIES
  { heading: 'app activities' },
  {
    title: 'Findings',
    icon: { icon: 'tabler-folder' },
    children: [
      {
        title: 'Information',
        to: 'findings-information',
      },
      {
        title: 'Work Orders',
        to: 'work-orders',
      },
    ],
  },
  {
    title: 'Facility Booking',
    to: 'facility-booking',
    icon: { icon: 'tabler-folder' },
  },
  {
    title: 'Goods Permit',
    icon: { icon: 'tabler-folder' },
    children: [
      {
        title: 'Information',
        to: 'goods-permit-information',
      },
      {
        title: 'Checking',
        to: 'checking',
      },
    ],
  },
  {
    title: 'Work Permits',
    icon: { icon: 'tabler-folder' },
    children: [
      {
        title: 'Information',
        to: 'work-permits-information',
      },
      {
        title: 'Attendance',
        to: 'attendance',
      },
      {
        title: 'Inspection',
        to: 'inspection',
      },
    ],
  },

  //SECTION - SUBJECT DIRECTORY
  { heading: 'subject directory' },
  {
    title: 'Facilities',
    icon: { icon: 'tabler-folder' },
    children: [
      {
        title: 'Directory',
        to: 'directory',
      },
      {
        title: 'Reservation',
        to: 'reservation',
      },
    ],
  },
  {
    title: 'Subjects',
    icon: { icon: 'tabler-folder' },
    children: [
      {
        title: 'Gallery',
        to: 'gallery',
      },
      {
        title: 'Document',
        to: 'document',
      },
      {
        title: 'Article',
        to: 'article',
      },
    ],
  },

  //SECTION LOCATION DIRECTORY
  { heading: 'location directory' },
  {
    title: 'Units',
    to: 'units',
    icon: { icon: 'tabler-building-skyscraper' },
  },
  {
    title: 'Areas',
    to: 'areas',
    icon: { icon: 'tabler-building-skyscraper' },
  },
  {
    title: 'Locations',
    icon: { icon: 'tabler-building-skyscraper' },
    children: [
      {
        title: 'Building',
        to: 'building',
      },
      {
        title: 'Floor',
        to: 'floor',
      },
      {
        title: 'Unit',
        to: 'unit',
      },
    ],
  },

  //SECTION PERSON DIRECTORY
  { heading: 'person directory' },
  {
    title: 'Occupants',
    to: 'occupants',
    icon: { icon: 'tabler-users' },
  },
  {
    title: 'Members',
    to: 'members',
    icon: { icon: 'tabler-users' },
  },
]
