import { DEFAULT_JOB_FILTER, JobSearchFilter } from '@/types/job.filter.types';

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
      ...DEFAULT_JOB_FILTER,
      limit: 60,
      formattedLocation: "friuli",
      nostatus: true,
      wait: true,
      skillsFilter: [],
      workTypes: []
    }
  },
  {id:'Prob_70_perc_remote',
    label: 'Probabilidade de 70% - Remote Java',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 60,
      nostatus: true,
      wait: true,
      appliedByMeProbability: 70,
      workRemoteAllowed: true,
      skillsFilter: [],
      workTypes: ["Part-time", "Full-time"],
      llmDescription: "Java[^s]",
    }
  },
  {id:'Prob_70_perc_remote',
    label: 'Probabilidade de 70% - Remote',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 60,
      nostatus: true,
      wait: true,
      appliedByMeProbability: 70,
      workRemoteAllowed: true,
      skillsFilter: [],
      workTypes: ["Part-time", "Full-time"],
    }
  },
  {id:'Prob_70_perc-linkedin',
    label: 'Probabilidade de 70% - LinkedIn',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 60,
      nostatus: true,
      wait: true,
      appliedByMeProbability: 70,
      systemRecruter: "LinkedIn",
      skillsFilter: [],
      workTypes: []
    }
  },
  {id:'Prob_70_perc',
    label: 'has 70% probability accept',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      appliedByMeProbability: 70,
      skillsFilter: [],
      workTypes: []
    }
  },
  {
    id: 'remote-java-llm-linkedin',
    label: 'Remote Java LLM Link',
    filter: {
      ...DEFAULT_JOB_FILTER,
      "limit": 20,
      "sort": {
        "predictedApplyingInfo.appliedByMeProbability": -1
      },
      "nostatus": true,
      "percentualMatch": 50,
      "systemRecruter": "LinkedIn",
      "llmDescription": "Java[^s]",
      "wait": true,
      "workTypes": ["Part-time", "Full-time"],
      "workRemoteAllowed": true,
      "skillsFilter": []
    }
  },
  {
    id: 'remote-java-linkedin-50',
    label: 'Remote Java Link 50',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      percentualMatch: 50,
      systemRecruter: "LinkedIn",
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'remote-java-50',
    label: 'Remote Java 50',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      percentualMatch: 50,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: "Java Italy linkedin", label: "Java Italy LinkedIn", filter: {
      "limit": 100,
      "sort": {
        "lastupdate": -1
      },
      systemRecruter: "LinkedIn",
      "formattedLocation": "Italy",
      "nostatus": true,
      "wait": true,
      percentualMatch: 1,
      "workRemoteAllowed": true,
      "skillsFilter": ["Java"],
      "workTypes": ["Part-time", "Full-time"],
    }
  },
  {
    id: "Java Italy Other", label: "Java Italy Other", filter: {
      "limit": 100,
      "sort": {
        "lastupdate": -1
      },
      "formattedLocation": "Italy",
      "nostatus": true,
      "wait": true,
      percentualMatch: 1,
      "workRemoteAllowed": true,
      "skillsFilter": ["Java"],
      "workTypes": ["Part-time", "Full-time"],
    }
  },
  {
    id: 'remote-java-all',
    label: 'Remote Java',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      percentualMatch: 1,
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'remote-ML-all',
    label: 'Remote ML',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      percentualMatch: 1,
      workRemoteAllowed: true,
      skillsFilter: ["Machine Learning"],
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'remoto-70',
    label: 'Remoto 70',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      percentualMatch: 70,
      workRemoteAllowed: true,
      workTypes: ["Part-time", "Full-time"]
    }
  },
  {
    id: 'hibrido-java',
    label: 'Hibrido Java',
    filter: {
      ...DEFAULT_JOB_FILTER,
      limit: 20,
      nostatus: true,
      wait: true,
      percentualMatch: 70,
      systemRecruter: "LinkedIn",
      workRemoteAllowed: true,
      skillsFilter: ["Java"],
      workTypes: ["Part-time", "Full-time"]
    }
  }
];
