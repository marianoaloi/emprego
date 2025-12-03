import { JobSearchFilter } from '@/types/job.filter.types';

export interface PresetFilter {
  id: string;
  label: string;
  filter: JobSearchFilter;
}

export const PRESET_FILTERS: PresetFilter[] = [
  {
    id: 'friuli',
    label: 'Friuli',
    filter: {
      limit: 20,
      sort: { lastupdate: -1 },
      formattedLocation: "friuli",
      nostatus: true,
      wait: true,
      percentualMatch: 0,
      percentualMatchGreaterThan: true,
      workRemoteAllowed: false,
      skillsFilter: [],
      workTypes: []
    }
  },
  {
    id: 'remote-java-linkedin',
    label: 'Remote Java Link',
    filter: {
      limit: 20,
      sort: { lastupdate: -1 },
      formattedLocation: "",
      nostatus: true,
      wait: true,
      percentualMatch: 70,
      systemRecruter: "LinkedIn",
      percentualMatchGreaterThan: true,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'remote-java-linkedin',
    label: 'Remote Java Link 50',
    filter: {
      limit: 20,
      sort: { lastupdate: -1 },
      formattedLocation: "",
      nostatus: true,
      wait: true,
      percentualMatch: 50,
      systemRecruter: "LinkedIn",
      percentualMatchGreaterThan: true,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'remote-java-all',
    label: 'Remote Java',
    filter: {
      limit: 20,
      sort: { lastupdate: -1 },
      formattedLocation: "",
      nostatus: true,
      wait: true,
      percentualMatch: 70,
      systemRecruter: undefined,
      percentualMatchGreaterThan: true,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'remoto-70',
    label: 'Remoto 70',
    filter: {
      limit: 20,
      sort: { lastupdate: -1 },
      formattedLocation: "",
      nostatus: true,
      wait: true,
      percentualMatch: 70,
      systemRecruter: "LinkedIn",
      percentualMatchGreaterThan: true,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'hibrido-java',
    label: 'Hibrido Java',
    filter: {
      limit: 20,
      sort: { lastupdate: -1 },
      formattedLocation: "",
      nostatus: true,
      wait: true,
      percentualMatch: 70,
      systemRecruter: "LinkedIn",
      percentualMatchGreaterThan: true,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  }
];
