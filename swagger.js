const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Javascript Study',
    description: '항해99 W6 Miniproject',
  },
  host: '3.39.161.93:5000',
  basePath: '/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: '로그인, 회원가입, 내 정보 조회',
    },
    {
      name: 'Posts',
      description: '게시글 생성, 조회, 수정, 삭제',
    },
    {
      name: 'Comments',
      description: '댓글 생성, 조회, 수정, 삭제',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-KEY',
      description: 'any description...',
    },
  },
  definitions: {
    Users: {
      email: 'test@google.com',
      nickname: 'nickname',
      password: 'test1234',
      profileImg: 'url',
    },
    Posts: {
      postId: 1,
      $nickname: 'nickname',
      category: '초급',
      date: '2022-06-13',
      title: 'title test',
      content: 'content test',
    },
    Comments: {
      $postId: 1,
      commentId: 1,
      $nickname: 'nickname',
      comment: 'comment test',
      date: '2022-06-13',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './routes/posts.js',
  './routes/users.route.js',
  './routes/comments.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
