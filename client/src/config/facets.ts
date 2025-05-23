import {
  IFacetNamesLists,
  IFacetToSearchTermConfig,
  ISearchTermToFacetConfig,
} from '../types/IFacetNames'
import { ICriteria } from '../types/ISearchResults'

import { recordTypes } from './advancedSearch/inputTypes'

export type LabelFunc = (value: number | string) => string
export type QueryFunc = (value: number | string) => object

export type Scope = 'agent' | 'item' | 'work' | 'set' | 'concept' | 'event'

export interface IFacet {
  sectionLabel: string
  facetLabel?: string | LabelFunc
  selectedLabel?: string | LabelFunc
  buildQuery: QueryFunc
}

type IFacetConfig = Record<Scope, Record<string, IFacet>>

// This should replace facetLabels and facetSearchTerms
export const facets: IFacetConfig = {
  item: {
    itemHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
    itemIsOnline: {
      sectionLabel: 'Is Online',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) => (value === 1 ? 'Is online' : 'Not online'),
      buildQuery: (value) => ({ isOnline: value }),
    },
    itemRecordType: {
      sectionLabel: 'Object Class',
      facetLabel: (value) => recordTypes.item[value],
      selectedLabel: (value) => recordTypes.item[value],
      buildQuery: (value) => ({ recordType: value }),
    },
    responsibleCollections: {
      sectionLabel: 'Collection',
      buildQuery: (value) => ({ memberOf: { id: value } }),
    },
    responsibleUnits: {
      sectionLabel: 'Responsible Unit',
      buildQuery: (value) => ({
        memberOf: {
          curatedBy: {
            OR: [
              {
                memberOf: {
                  id: value,
                },
              },
              {
                id: value,
              },
            ],
          },
        },
      }),
    },
  },
  work: {
    workHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
    workIsOnline: {
      sectionLabel: 'Is Online',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) => (value === 1 ? 'Is online' : 'Not online'),
      buildQuery: (value) => ({ isOnline: value }),
    },
    workRecordType: {
      sectionLabel: 'Work Class',
      facetLabel: (value) => recordTypes.work[value],
      selectedLabel: (value) => recordTypes.work[value],
      buildQuery: (value) => ({ recordType: value }),
    },
  },
  set: {
    setHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
    setIsOnline: {
      sectionLabel: 'Is Online',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) => (value === 1 ? 'Is online' : 'Not online'),
      buildQuery: (value) => ({ isOnline: value }),
    },
  },
  agent: {
    agentHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
  },
  concept: {
    conceptRecordType: {
      sectionLabel: 'Concept Class',
      facetLabel: (value) => recordTypes.concept[value],
      selectedLabel: (value) => recordTypes.concept[value],
      buildQuery: (value) => ({ recordType: value }),
    },
  },
  event: {
    eventRecordType: {
      sectionLabel: 'Event Class',
      facetLabel: (value) => recordTypes.event[value],
      selectedLabel: (value) => recordTypes.event[value],
      buildQuery: (value) => ({ recordType: value }),
    },
  },
}

export const facetNamesLists: IFacetNamesLists = {
  objects: [
    'itemHasDigitalImage',
    'itemIsOnline',
    'itemRecordType',
    'itemTypeId',
    'itemMaterialId',
    'itemEncounteredAgentId',
    'itemEncounteredPlaceId',
    'itemEncounteredDate',
    'itemProductionAgentId',
    'itemProductionPlaceId',
    'itemProductionDate',
    'responsibleUnits',
    'responsibleCollections',
  ],
  works: [
    'workHasDigitalImage',
    'workIsOnline',
    'workRecordType',
    'workTypeId',
    'workLanguageId',
    'workAboutItemId',
    'workAboutWorkId',
    'workAboutSetId',
    'workAboutAgentId',
    'workAboutPlaceId',
    'workAboutConceptId',
    'workAboutEventId',
    'workCreationAgentId',
    'workCreationPlaceId',
    'workCreationDate',
    'workPublicationAgentId',
    'workPublicationPlaceId',
    'workPublicationDate',
  ],
  collections: [
    'setHasDigitalImage',
    'setIsOnline',
    'setTypeId',
    'setAboutItemId',
    'setAboutWorkId',
    'setAboutSetId',
    'setAboutAgentId',
    'setAboutPlaceId',
    'setAboutConceptId',
    'setAboutEventId',
    'setCreationAgentId',
    'setCreationPlaceId',
    'setCreationDate',
    'setPublicationAgentId',
    'setPublicationPlaceId',
    'setPublicationDate',
    'setCurationAgentId',
    'setPartOfId',
  ],
  people: [
    'agentHasDigitalImage',
    'agentGenderId',
    'agentNationalityId',
    'agentRecordType',
    'agentTypeId',
    'agentStartPlaceId',
    'agentStartDate',
    'agentEndPlaceId',
    'agentEndDate',
    'agentOccupationId',
    'agentActivePlaceId',
    'agentActiveDate',
    'agentMemberOfId',
    'agentProfessionalActivityId',
  ],
  places: ['placeTypeId', 'placePartOfId'],
  concepts: [
    'conceptRecordType',
    'conceptTypeId',
    'conceptPartOfId',
    'conceptInfluencedByAgentId',
    'conceptInfluencedByConceptId',
    'conceptInfluencedByEventId',
    'conceptInfluencedByPlaceId',
  ],
  events: [
    'eventRecordType',
    'eventTypeId',
    'eventPlaceId',
    'eventAgentId',
    'eventStartDate',
    'eventEndDate',
  ],
}

export const facetLabels: { [key: string]: string } = {
  agentHasDigitalImage: 'Has Digital Image',
  agentGenderId: 'Gender',
  agentNationalityId: 'Nationality',
  agentStartPlaceId: 'Born/Formed At',
  agentEndPlaceId: 'Died/Dissolved At',
  agentStartDate: 'Born/Formed Date',
  agentEndDate: 'Died/Dissolved Date',
  agentActiveDate: 'Professionally Active Date',
  agentOccupationId: 'Occupation/Role',
  agentActivePlaceId: 'Professionally Active At',
  agentMemberOfId: 'Member Of',
  agentProfessionalActivityId: 'Professional Activity Categorized As',
  agentRecordType: 'Person or Group Class',
  agentTypeId: 'Categorized As',
  conceptInfluencedByAgentId: 'Influenced by Person & Group',
  conceptInfluencedByConceptId: 'Influenced by Concept',
  conceptInfluencedByEventId: 'Influenced by Event',
  conceptInfluencedByPlaceId: 'Influenced by Place',
  conceptPartOfId: 'Part Of',
  conceptRecordType: 'Concept Class',
  conceptTypeId: 'Categorized As',
  eventAgentId: 'Carried Out By',
  eventEndDate: 'End Date',
  eventPlaceId: 'Took Place At',
  eventStartDate: 'Start Date',
  eventTypeId: 'Categorized As',
  eventRecordType: 'Event Class',
  itemHasDigitalImage: 'Has Digital Image',
  itemIsOnline: 'Is Online',
  itemTypeId: 'Categorized As',
  itemMaterialId: 'Materials',
  itemEncounteredPlaceId: 'Encountered At',
  itemEncounteredAgentId: 'Encountered By',
  itemEncounteredDate: 'Encounter Date',
  itemProductionDate: 'Creation Date',
  itemProductionPlaceId: 'Created At',
  itemProductionAgentId: 'Created By',
  itemRecordType: 'Object Class',
  placePartOfId: 'Part Of',
  placeTypeId: 'Categorized As',
  responsibleCollections: 'Collection',
  responsibleUnits: 'Responsible Unit',
  setAboutAgentId: 'About People & Groups',
  setAboutConceptId: 'About Concept',
  setAboutEventId: 'About Event',
  setAboutItemId: 'About Object',
  setAboutPlaceId: 'About Place',
  setAboutSetId: 'About Collection',
  setAboutWorkId: 'About Work',
  setCreationAgentId: 'Created By',
  setCreationDate: 'Creation Date',
  setCreationPlaceId: 'Created At',
  setCurationAgentId: 'Curated By',
  setHasDigitalImage: 'Has Digital Image',
  setIsOnline: 'Is Online',
  setPartOfId: 'Part Of',
  setPublicationAgentId: 'Published By',
  setPublicationPlaceId: 'Published At',
  setPublicationDate: 'Published Date',
  setTypeId: 'Categorized As',
  workHasDigitalImage: 'Has Digital Image',
  workIsOnline: 'Is Online',
  workTypeId: 'Categorized As',
  workAboutItemId: 'About Object',
  workAboutWorkId: 'About Work',
  workAboutSetId: 'About Collection',
  workAboutAgentId: 'About People & Groups',
  workPublicationAgentId: 'Published By',
  workCreationAgentId: 'Created By',
  workAboutPlaceId: 'About Place',
  workPublicationPlaceId: 'Published At',
  workCreationPlaceId: 'Created At',
  workAboutConceptId: 'About Concept',
  workAboutEventId: 'About Event',
  workPublicationDate: 'Published Date',
  workCreationDate: 'Created Date',
  workLanguageId: 'Language',
  workRecordType: 'Work Class',
}

export const facetSearchTerms: IFacetToSearchTermConfig = {
  item: {
    itemHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    itemIsOnline: {
      searchTermName: 'isOnline',
      idFacet: false,
    },
    itemTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    itemMaterialId: {
      searchTermName: 'material',
      idFacet: true,
    },
    itemEncounteredDate: {
      searchTermName: 'encounteredDate',
      idFacet: false,
    },
    itemEncounteredAgentId: {
      searchTermName: 'encounteredBy',
      idFacet: true,
    },
    itemEncounteredPlaceId: {
      searchTermName: 'encounteredAt',
      idFacet: true,
    },
    itemProductionPlaceId: {
      searchTermName: 'producedAt',
      idFacet: true,
    },
    itemProductionAgentId: {
      searchTermName: 'producedBy',
      idFacet: true,
    },
    itemProductionDate: {
      searchTermName: 'producedDate',
      idFacet: false,
    },
    itemRecordType: {
      searchTermName: 'recordType',
      idFacet: false,
    },
  },
  work: {
    workHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    workIsOnline: {
      searchTermName: 'isOnline',
      idFacet: false,
    },
    workTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    workAboutItemId: {
      searchTermName: 'aboutItem',
      idFacet: true,
    },
    workAboutWorkId: {
      searchTermName: 'aboutWork',
      idFacet: true,
    },
    workAboutSetId: {
      searchTermName: 'aboutSet',
      idFacet: true,
    },
    workAboutAgentId: {
      searchTermName: 'aboutAgent',
      idFacet: true,
    },
    workPublicationAgentId: {
      searchTermName: 'publishedBy',
      idFacet: true,
    },
    workCreationAgentId: {
      searchTermName: 'createdBy',
      idFacet: true,
    },
    workAboutPlaceId: {
      searchTermName: 'aboutPlace',
      idFacet: true,
    },
    workPublicationPlaceId: {
      searchTermName: 'publishedAt',
      idFacet: true,
    },
    workCreationPlaceId: {
      searchTermName: 'createdAt',
      idFacet: true,
    },
    workAboutConceptId: {
      searchTermName: 'aboutConcept',
      idFacet: true,
    },
    workAboutEventId: {
      searchTermName: 'aboutEvent',
      idFacet: true,
    },
    workPublicationDate: {
      searchTermName: 'publishedDate',
      idFacet: false,
    },
    workCreationDate: {
      searchTermName: 'createdDate',
      idFacet: false,
    },
    workLanguageId: {
      searchTermName: 'language',
      idFacet: true,
    },
    workRecordType: {
      searchTermName: 'recordType',
      idFacet: false,
    },
  },
  set: {
    setAboutAgentId: {
      searchTermName: 'aboutAgent',
      idFacet: true,
    },
    setAboutConceptId: {
      searchTermName: 'aboutConcept',
      idFacet: true,
    },
    setAboutEventId: {
      searchTermName: 'aboutEvent',
      idFacet: true,
    },
    setAboutItemId: {
      searchTermName: 'aboutItem',
      idFacet: true,
    },
    setAboutPlaceId: {
      searchTermName: 'aboutPlace',
      idFacet: true,
    },
    setAboutSetId: {
      searchTermName: 'aboutSet',
      idFacet: true,
    },
    setAboutWorkId: {
      searchTermName: 'aboutWork',
      idFacet: true,
    },
    setCreationAgentId: {
      searchTermName: 'createdBy',
      idFacet: true,
    },
    setCreationDate: {
      searchTermName: 'createdDate',
      idFacet: false,
    },
    setCreationPlaceId: {
      searchTermName: 'createdAt',
      idFacet: true,
    },
    setCurationAgentId: {
      searchTermName: 'curatedBy',
      idFacet: true,
    },
    setHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    setIsOnline: {
      searchTermName: 'isOnline',
      idFacet: false,
    },
    setPartOfId: {
      searchTermName: 'partOf',
      idFacet: true,
    },
    setPublicationAgentId: {
      searchTermName: 'publishedBy',
      idFacet: true,
    },
    setPublicationPlaceId: {
      searchTermName: 'publishedAt',
      idFacet: true,
    },
    setPublicationDate: {
      searchTermName: 'publishedDate',
      idFacet: false,
    },
    setTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
  },
  agent: {
    agentHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    agentGenderId: {
      searchTermName: 'gender',
      idFacet: true,
    },
    agentNationalityId: {
      searchTermName: 'nationality',
      idFacet: true,
    },
    agentStartPlaceId: {
      searchTermName: 'startAt',
      idFacet: true,
    },
    agentEndPlaceId: {
      searchTermName: 'endAt',
      idFacet: true,
    },
    agentStartDate: {
      searchTermName: 'startDate',
      idFacet: false,
    },
    agentEndDate: {
      searchTermName: 'endDate',
      idFacet: false,
    },
    agentActiveDate: {
      searchTermName: 'activeDate',
      idFacet: false,
    },
    agentOccupationId: {
      searchTermName: 'occupation',
      idFacet: true,
    },
    agentActivePlaceId: {
      searchTermName: 'activeAt',
      idFacet: true,
    },
    agentMemberOfId: {
      searchTermName: 'memberOf',
      idFacet: true,
    },
    agentProfessionalActivityId: {
      searchTermName: 'professionalActivity',
      idFacet: true,
    },
    agentTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    agentRecordType: {
      searchTermName: 'recordType',
      idFacet: false,
    },
  },
  place: {
    placeTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    placePartOfId: {
      searchTermName: 'partOf',
      idFacet: true,
    },
  },
  concept: {
    conceptInfluencedByAgentId: {
      searchTermName: 'influencedByAgent',
      idFacet: true,
    },
    conceptInfluencedByConceptId: {
      searchTermName: 'influencedByConcept',
      idFacet: true,
    },
    conceptInfluencedByEventId: {
      searchTermName: 'influencedByEvent',
      idFacet: true,
    },
    conceptInfluencedByPlaceId: {
      searchTermName: 'influencedByPlace',
      idFacet: true,
    },
    conceptTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    conceptPartOfId: {
      searchTermName: 'broader',
      idFacet: true,
    },
    conceptRecordType: {
      searchTermName: 'recordType',
      idFacet: false,
    },
  },
  event: {
    eventStartDate: {
      searchTermName: 'startDate',
      idFacet: false,
    },
    eventEndDate: {
      searchTermName: 'endDate',
      idFacet: false,
    },
    eventTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    eventPlaceId: {
      searchTermName: 'tookPlaceAt',
      idFacet: true,
    },
    eventAgentId: {
      searchTermName: 'carriedOutBy',
      idFacet: true,
    },
    eventRecordType: {
      searchTermName: 'recordType',
      idFacet: false,
    },
  },
}

export const whereAtYaleSearchTermFacets = {
  item: {
    memberOf: (searchObj: ICriteria) => {
      let returnValue: Array<ICriteria> | null = []
      if (searchObj.memberOf) {
        if (searchObj.memberOf?.curatedBy) {
          if (searchObj.memberOf?.curatedBy.OR) {
            for (const obj of searchObj.memberOf.curatedBy.OR) {
              if (obj.id) {
                returnValue.push({
                  facetName: 'responsibleUnits',
                  value: obj.id,
                })
              }
            }
          }
        }
        if (searchObj.memberOf.id) {
          returnValue.push({
            facetName: 'responsibleCollections',
            value: searchObj.memberOf.id,
          })
        }
      }
      returnValue = returnValue.length === 0 ? null : returnValue
      return returnValue
    },
  },
}

export const searchTermFacets: ISearchTermToFacetConfig = {
  item: {
    classification: {
      facetName: 'itemTypeId',
      idFacet: true,
    },
    encounteredBy: {
      facetName: 'itemEncounteredAgentId',
      idFacet: true,
    },
    encounteredAt: {
      facetName: 'itemEncounteredPlaceId',
      idFacet: true,
    },
    encounteredDate: {
      facetName: 'itemEncounteredDate',
      idFacet: false,
    },
    hasDigitalImage: {
      facetName: 'itemHasDigitalImage',
      idFacet: false,
    },
    isOnline: {
      facetName: 'itemIsOnline',
      idFacet: false,
    },
    material: {
      facetName: 'itemMaterialId',
      idFacet: true,
    },
    producedAt: {
      facetName: 'itemProductionPlaceId',
      idFacet: true,
    },
    producedBy: {
      facetName: 'itemProductionAgentId',
      idFacet: true,
    },
    producedDate: {
      facetName: 'itemProductionDate',
      idFacet: false,
    },
    recordType: {
      facetName: 'itemRecordType',
      idFacet: false,
    },
  },
  work: {
    hasDigitalImage: {
      facetName: 'workHasDigitalImage',
      idFacet: false,
    },
    isOnline: {
      facetName: 'workIsOnline',
      idFacet: false,
    },
    classification: {
      facetName: 'workTypeId',
      idFacet: true,
    },
    aboutItem: {
      facetName: 'workAboutItemId',
      idFacet: true,
    },
    aboutWork: {
      facetName: 'workAboutWorkId',
      idFacet: true,
    },
    aboutSet: {
      facetName: 'workAboutSetId',
      idFacet: true,
    },
    aboutAgent: {
      facetName: 'workAboutAgentId',
      idFacet: true,
    },
    publishedBy: {
      facetName: 'workPublicationAgentId',
      idFacet: true,
    },
    createdBy: {
      facetName: 'workCreationAgentId',
      idFacet: true,
    },
    aboutPlace: {
      facetName: 'workAboutPlaceId',
      idFacet: true,
    },
    publishedAt: {
      facetName: 'workPublicationPlaceId',
      idFacet: true,
    },
    createdAt: {
      facetName: 'workCreationPlaceId',
      idFacet: true,
    },
    aboutConcept: {
      facetName: 'workAboutConceptId',
      idFacet: true,
    },
    aboutEvent: {
      facetName: 'workAboutEventId',
      idFacet: true,
    },
    publishedDate: {
      facetName: 'workPublicationDate',
      idFacet: false,
    },
    createdDate: {
      facetName: 'workCreationDate',
      idFacet: false,
    },
    language: {
      facetName: 'workLanguageId',
      idFacet: true,
    },
    recordType: {
      facetName: 'workRecordType',
      idFacet: false,
    },
  },
  set: {
    aboutAgent: {
      facetName: 'setAboutAgentId',
      idFacet: true,
    },
    aboutConcept: {
      facetName: 'setAboutConceptId',
      idFacet: true,
    },
    aboutEvent: {
      facetName: 'setAboutEventId',
      idFacet: true,
    },
    aboutItem: {
      facetName: 'setAboutItemId',
      idFacet: true,
    },
    aboutPlace: {
      facetName: 'setAboutPlaceId',
      idFacet: true,
    },
    aboutSet: {
      facetName: 'setAboutSetId',
      idFacet: true,
    },
    aboutWork: {
      facetName: 'setAboutWorkId',
      idFacet: true,
    },
    createdBy: {
      facetName: 'setCreationAgentId',
      idFacet: true,
    },
    createdDate: {
      facetName: 'setCreationDate',
      idFacet: false,
    },
    createdAt: {
      facetName: 'setCreationPlaceId',
      idFacet: true,
    },
    curatedBy: {
      facetName: 'setCurationAgentId',
      idFacet: true,
    },
    hasDigitalImage: {
      facetName: 'setHasDigitalImage',
      idFacet: false,
    },
    isOnline: {
      facetName: 'setIsOnline',
      idFacet: false,
    },
    partOf: {
      facetName: 'setPartOfId',
      idFacet: true,
    },
    publishedBy: {
      facetName: 'setPublicationAgentId',
      idFacet: true,
    },
    publishedAt: {
      facetName: 'setPublicationPlaceId',
      idFacet: true,
    },
    publishedDate: {
      facetName: 'setPublicationDate',
      idFacet: false,
    },
    classification: {
      facetName: 'setTypeId',
      idFacet: true,
    },
  },
  agent: {
    hasDigitalImage: {
      facetName: 'agentHasDigitalImage',
      idFacet: false,
    },
    gender: {
      facetName: 'agentGenderId',
      idFacet: true,
    },
    nationality: {
      facetName: 'agentNationalityId',
      idFacet: true,
    },
    startAt: {
      facetName: 'agentStartPlaceId',
      idFacet: true,
    },
    endAt: {
      facetName: 'agentEndPlaceId',
      idFacet: true,
    },
    startDate: {
      facetName: 'agentStartDate',
      idFacet: false,
    },
    endDate: {
      facetName: 'agentEndDate',
      idFacet: false,
    },
    activeDate: {
      facetName: 'agentActiveDate',
      idFacet: false,
    },
    occupation: {
      facetName: 'agentOccupationId',
      idFacet: true,
    },
    activeAt: {
      facetName: 'agentActivePlaceId',
      idFacet: true,
    },
    memberOf: {
      facetName: 'agentMemberOfId',
      idFacet: true,
    },
    classification: {
      facetName: 'agentTypeId',
      idFacet: true,
    },
    professionalActivity: {
      facetName: 'agentProfessionalActivityId',
      idFacet: true,
    },
    recordType: {
      facetName: 'agentRecordType',
      idFacet: false,
    },
  },
  place: {
    classification: {
      facetName: 'placeTypeId',
      idFacet: true,
    },
    partOf: {
      facetName: 'placePartOfId',
      idFacet: true,
    },
  },
  concept: {
    classification: {
      facetName: 'conceptTypeId',
      idFacet: true,
    },
    broader: {
      facetName: 'conceptPartOfId',
      idFacet: true,
    },
    influencedByAgent: {
      facetName: 'conceptInfluencedByAgentId',
      idFacet: true,
    },
    influencedByConcept: {
      facetName: 'conceptInfluencedByConceptId',
      idFacet: true,
    },
    influencedByEvent: {
      facetName: 'conceptInfluencedByEventId',
      idFacet: true,
    },
    influencedByPlace: {
      facetName: 'conceptInfluencedByPlaceId',
      idFacet: true,
    },
    recordType: {
      facetName: 'conceptRecordType',
      idFacet: false,
    },
  },
  event: {
    classification: {
      facetName: 'eventTypeId',
      idFacet: true,
    },
    tookPlaceAt: {
      facetName: 'eventPlaceId',
      idFacet: true,
    },
    carriedOutBy: {
      facetName: 'eventAgentId',
      idFacet: true,
    },
    recordType: {
      facetName: 'eventRecordType',
      idFacet: false,
    },
    startDate: {
      facetName: 'eventStartDate',
      idFacet: false,
    },
    endDate: {
      facetName: 'eventEndDate',
      idFacet: false,
    },
  },
}

export const booleanFacetNames = new Set([
  'itemIsOnline',
  'workIsOnline',
  'setIsOnline',
  'itemHasDigitalImage',
  'workHasDigitalImage',
  'setHasDigitalImage',
  'agentHasDigitalImage',
])

export const selectedDateFacetLabels: Record<string, string> = {
  agentStartDate: 'Born/Formed in',
  agentEndDate: 'Died/Dissolved in',
  agentActiveDate: 'Professionally Active in',
  eventEndDate: 'Ended in',
  eventStartDate: 'Started in',
  itemEncounteredDate: 'Encountered in',
  itemProductionDate: 'Created in',
  setCreationDate: 'Created in',
  setPublicationDate: 'Published in',
  workPublicationDate: 'Published in',
  workCreationDate: 'Created in',
}
