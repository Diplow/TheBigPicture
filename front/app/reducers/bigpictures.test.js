
import reducer from './bigpictures.js'
import expect from 'expect'
import * as cst from '../constants'


describe('bigpictures reducer', () => {

  const bp = {
    "id":26,
    "title":"Le projet VDE",
    "body":"",
    "children":[],
    "hyperlink":null,
    "hyperlink_id":null,
    "parent":null,
    "subject":26,
    "author":1,
    "creation_date":"2020-02-11",
    "modification_date":"2020-06-03T20:44:54.052648Z",
    "favorite":false,
    "references":[],
    "private":false
  }

  it('add big picture', () => {
    const action = require("../../cypress/fixtures/actions/add_bigpicture.json")
    const initStore = []
    const store = require("../../cypress/fixtures/store/bigpictures.json")
    expect(reducer(initStore, action)).toEqual(store)
  })

  it('add big picture reference', () => {
    const action = {
      type: cst.actions.ADD_BIG_PICTURE_REFERENCE,
      bpId: 26,
      referenceId: 26
    }
    const initStore = [bp]
    const afterStore = [{ ...bp, references: [26] }]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

  it('add big picture results', () => {
    const action = {
      type: 'ADD_BIG_PICTURE_RESULTS',
      bpId: 26,
      results: {
        count: 1,
        '3star': 0,
        '4star': 1,
        median: 4,
        '5star': 0,
        '1star': 0,
        '0star': 0,
        '2star': 0
      }
    }
    const initStore = [bp]
    const afterStore = [{ ...bp, results: action.results }]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

  it('set bp rating count', () => {
    const action = {
      type: 'SET_BP_RATING_COUNT',
      count: 1,
      bpId: 26,
      requestId: 'GET-ratings-format=json-favorites=false-bigpicture=26-page=1'
    }
    const initStore = [bp]
    const afterStore = [{ ...bp, ratingCount: action.count }]
    expect(reducer(initStore, action)).toEqual(afterStore)

  })

  it('set bp reference count', () => {
    const action = {
      type: 'SET_BP_REFERENCE_COUNT',
      count: 1,
      bpId: 26,
      requestId: 'GET-subjects-format=json-favorites=false-reference=26-page=1'
    }
    const initStore = [bp]
    const afterStore = [{ ...bp, referenceCount: action.count }]
    expect(reducer(initStore, action)).toEqual(afterStore)

  })

  it('set bp endorsment count', () => {
    const action = {
      type: 'SET_BP_ENDORSMENT_COUNT',
      count: 1,
      bpId: 26,
      requestId: 'GET-bigpictures-26-results--format=json-bigpictureId=26-60c07c9b-ca5a-421e-922b-4e99c28adda0'
    }
    const initStore = [bp]
    const afterStore = [{ ...bp, endorsmentCount: action.count }]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

  it('logout', () => {
    const action = {
      type: 'LOGOUT'
    }
    const initStore = [bp, { ...bp, id: bp.id+1, private: true}]
    const afterStore = [bp]
    expect(reducer(initStore, action)).toEqual(afterStore)

  })

  it('add subscription', () => {
    const action = {
      type: 'ADD_SUBSCRIPTION',
      subscription: {
        id: 39,
        target: {
          id: 17,
          username: 'VictorFerry',
          groups: [],
          image: 'http://localhost:8000/media/profile_images/vf.jpeg',
          bio: 'Ce compte n\'est pas tenu par Victor Ferry, c\'est [moi](https://vue-d-ensemble.fr/user/9) qui ait recensé brièvement quelques uns de ses contenus pour illustrer l\'usage de VDE.'
        },
        target_id: 17,
        date: '2020-06-19',
        author: 1,
        'e575c336-d2d2-4705-af30-c3774f091737': 10,
        requestId: 'e575c336-d2d2-4705-af30-c3774f091737'
      }
    }
    const initStore = [bp, { ...bp, id: bp.id+1, author: action.subscription.target.id }]
    const afterStore = [bp, { ...bp, id: bp.id+1, author: action.subscription.target.id, favorite: true }]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

  it('delete subscription', () => {
    const action = {
      type: 'DELETE_SUBSCRIPTION',
      targetId: 17
    }
    const initStore = [bp, { ...bp, id: bp.id+1, author: action.targetId, favorite: true }]
    const afterStore = [bp, { ...bp, id: bp.id+1, author: action.targetId, favorite: false }]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

  it('add rating', () => {
    const action = {
      type: 'ADD_RATING',
      rating: {
        id: 33,
        author: {
          id: 1,
          username: 'Diplo',
          groups: [],
          image: 'http://localhost:8000/media/profile_images/vde3.png',
          bio: 'Fondateur du projet VDE, j\'aimerai faire ma part pour faire progresser la démocratie.'
        },
        author_id: 1,
        basisCount: 0,
        context: {
          ratings: [],
          subject: {
            "id":26,
            "hyperlink":null,
            "hyperlink_id":null,
            "subject":26,
            "author":{
              "id":1,
              "username":"Diplo",
              "groups":[

              ],
              "image":"http://localhost:8000/media/profile_images/vde3.png",
              "bio":"Fondateur du projet VDE, j'aimerai faire ma part pour faire progresser la démocratie. lololo"
            },
            "author_id":1,
            "family":[],
            "children":[],
            "title":"Le projet VDE",
            "body":"",
            "private":false,
            "creation_date":"2020-02-11",
            "modification_date":"2020-06-03T20:44:54.052648Z",
            "26b5e24a-2e6c-419e-8391-6567d77bead2":10,
            "referenceCount":1,
            "parent":null
          }
        },
        date: '2020-06-14',
        body: 'hjggh',
        target_bp: null,
        target_rating: 14,
        subject: 26
      }
    }
    const initStore = []
    const afterStore = [bp]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

  it('delete bigpicture', () => {
    const action = {
      type: 'DELETE_BIG_PICTURE',
      id: 266
    }
    const initStore = [bp, { ...bp, id: action.id }]
    const afterStore = [bp]
    expect(reducer(initStore, action)).toEqual(afterStore)
  })

})
