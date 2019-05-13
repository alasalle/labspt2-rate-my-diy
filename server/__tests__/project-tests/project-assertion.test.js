'use strict';
const EGQLT = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const schema = fs.readFileSync(
  path.join(__dirname, '..', '../../server/__tests__/mock-schema.graphql'),
  'utf8'
);

describe('Testing schema (Project), Query', () => {
  let tester;
  beforeAll(() => {
    tester = new EGQLT(schema);
  });

  describe('Should pass if the root level project query is valid.', () => {
    it('Is a valid getProjects query.', () => {
      const validQuery = `
    {
     projects {
      id
      name
      key
      category
      timestamp
      titleImg
      titleBlurb
      rating
      steps
     }
    }
   `;
      tester.test(true, validQuery);
    });
  });

  describe('Should pass iff the root level project query is invalid', () => {
    it('Is an invalid getProjects query.', () => {
      const invalidQuery = `
    {
     projects {
      id 
      name
      key
      invalidField
      category
      timestamp
      titleImg
      titleBlurb
      rating
      steps
     }
    }
   `;
      tester.test(false, invalidQuery);
    });
  });

  describe('Should pass if the nested project query is valid.', () => {
    it('Is a valid nested project query.', () => {
      const validNestedProjectQuery = `
    {
     projects {
      id 
      name
      key
      category
      timestamp
      titleImg
      titleBlurb
      rating
      steps
      User {
       id
     username
     userProfileImage
     bio
     email
      }
      Reviews {
       id
       name
       rKey
       text
       timestamp
       thumbsUp
       LikedBy {
        id
        email
        username
        userProfileImage
        bio
        privilege
        accountType
       }
       DislikedBy {
        id
        email
        username
        bio
       }
       Author {
        username
        email
        bio
        id
       }
       ProjectReviewed {
        id
        name
        key
        category
        timestamp
        titleImg
        titleBlurb
        rating
        steps
        User {
         username
         email
         id
        }
       }
       thumbsDown
      }
     }
    }
    `;
      tester.test(true, validNestedProjectQuery);
    });
  });
  describe('Should pass iff the nested project query is invalid.', () => {
    it('Is an invalid nested project query.', () => {
      const invalidNestedProjectQuery = `
    {
     projects {
      id 
      name
      key
      category
      timestamp
      titleImg
      titleBlurb
      rating
      invalidField
      steps
      User {
       id
     username
     userProfileImage
     bio
     email
      }
      Reviews {
       id
       name
       rKey
       text
       timestamp
       thumbsUp
       LikedBy {
        id
        email
        username
        userProfileImage
        bio
        privilege
        accountType
       }
       DislikedBy {
        id
        email
        username
        bio
       }
       Author {
        username
        email
        bio
        id
       }
       ProjectReviewed {
        id
        name
        key
        category
        timestamp
        titleImg
        titleBlurb
        rating
        steps
        User {
         username
         email
         id
        }
       }
       thumbsDown
      }
     }
    }
    `;
      tester.test(false, invalidNestedProjectQuery);
    });
  });
});

describe('Create Project Mutation', () => {
  it('Should return a properly shaped project object.', () => {
    const mutation = `
  mutation createProject {
   createProject(data:
    {
     name: "test", 
     category: "test", 
     titleImg: "test",
     titleBlurb: "test",
     timestamp: "test", 
     steps: "test"
     User: {
      create: {
       username: "test"
      }
     }
    })
    {
     name
     category
     titleImg
     titleBlurb
     timestamp
     steps
    }
  }
  `;
    const tester = new EGQLT(schema);
    tester.test(true, mutation, [
      {
        name: 'test',
        category: 'test',
        timestamp: 'test',
        titleImg: 'test',
        titleBlurb: 'test',
        steps: 'test',
        User: {
          create: {
            username: 'test'
          }
        }
      }
    ]);
  });
});
{
  username;
}

describe('Delete Project Mutation', () => {
  it('Should delete a project given unique input.', () => {
    const mutation = `
   mutation deleteProject($key: String!) {
    deleteProject(where: {key: $key}) {
     name
     id
    }
   }
  `;
    const key = {
      key: 'test'
    };
    const tester = new EGQLT(schema);
    const {
      data: { deleteProject }
    } = tester.mock({ query: mutation, variables: key });
  });
});