export interface Faculty {
  key: string
  short: string
  initials: string
  blurb: string
  detail: string
  tags: string[]
}

export const faculties: Faculty[] = [
  {
    key: 'Business and Management',
    short: 'Business & Management',
    initials: 'BM',
    blurb: 'From first Certificate to Professional Doctorate in business, administration and international management.',
    detail:
      'The founding faculty of the College, covering business administration, management practice and international business. Programmes blend rigorous academic theory with real-world practice, from short professional courses through to the Professional Doctorate in Business Administration.',
    tags: ['Business Administration', 'International Business', 'Management Practice'],
  },
  {
    key: 'Leadership and Organisational Development',
    short: 'Leadership & Org. Dev.',
    initials: 'LD',
    blurb: 'Ethical leadership, good governance and the skills to lead change in any organisation.',
    detail:
      'Develops ethical, effective leaders for businesses, public bodies and non-profits. Teaching models sound governance and effective management practice as the foundations of organisational success.',
    tags: ['Strategic Leadership', 'Governance', 'Organisational Development'],
  },
  {
    key: 'Health and Social Care Management',
    short: 'Health & Social Care',
    initials: 'HC',
    blurb: 'Preparing managers and leaders for health services, social care and community wellbeing.',
    detail:
      'Prepares students to manage and lead in health and social care settings — combining care values with the management, quality and leadership skills the sector needs.',
    tags: ['Health Services Management', 'Social Care Leadership', 'Quality & Safeguarding'],
  },
  {
    key: 'Hospitality and Tourism Management',
    short: 'Hospitality & Tourism',
    initials: 'HT',
    blurb: 'World-class training for the global hospitality, tourism and events industries.',
    detail:
      'Equips students for careers across hotels, travel, tourism and events — with an international outlook and a strong emphasis on service excellence and operational management.',
    tags: ['Hospitality Management', 'Tourism', 'Events Management'],
  },
  {
    key: 'Entrepreneurship and Innovation',
    short: 'Entrepreneurship',
    initials: 'EI',
    blurb: 'Turning ideas into ventures — creativity, innovation and enterprise skills for founders and intrapreneurs.',
    detail:
      'Fosters a culture of creativity and forward thinking, equipping students to launch ventures, drive innovation inside organisations, and lead change responsibly.',
    tags: ['Enterprise', 'Innovation Management', 'Start-up Practice'],
  },
]

export const facultyFullNames = faculties.map((f) => 'Faculty of ' + f.key)
