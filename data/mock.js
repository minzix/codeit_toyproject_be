// mock.js

const Groupdata = [
    { 
      title: '민지네 가족',
      img: 'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg',
      description: '민지네 가족입니다',
      isPublic: true,
      password: 'minji1234',
      likes: 0,
      Dday: new Date('2023-03-23T06:34:09.617Z') - new Date('2024-10-03T06:34:09.617Z'),
    },
    { 
      title: '친구들과의 여행',
      img: 'https://example.com/images/trip1.jpg',
      description: '올 여름 친구들과의 여행',
      isPublic: true,
      password: 'friend1234',
      likes: 5,
      Dday: new Date('2023-08-10T06:34:09.617Z') - new Date('2024-10-03T06:34:09.617Z'),
    },
    { 
      title: '가족의 특별한 날',
      img: 'https://example.com/images/family_event.jpg',
      description: '가족과 함께하는 특별한 날',
      isPublic: false,
      password: 'family5678',
      likes: 2,
      Dday: new Date('2023-09-15T06:34:09.617Z') - new Date('2024-10-03T06:34:09.617Z'),
    },
    { 
      title: '우리의 졸업식',
      img: 'https://example.com/images/graduation.jpg',
      description: '졸업식 날의 기억',
      isPublic: true,
      password: 'grad2024',
      likes: 15,
      Dday: new Date('2024-05-20T06:34:09.617Z') - new Date('2024-10-03T06:34:09.617Z'),
    },
    { 
      title: '겨울 여행',
      img: 'https://example.com/images/winter_trip.jpg',
      description: '겨울의 아름다움을 느끼다',
      isPublic: true,
      password: 'winter1234',
      likes: 8,
      Dday: new Date('2024-12-25T06:34:09.617Z') - new Date('2024-10-03T06:34:09.617Z'),
    },
  ];
  
  const Commentdata = [
    { 
      nickname: '민지',
      commentcontent: '첫번째로 남기는 댓글!',
      password: 'minji4542',
      createdAt: new Date('2023-03-23T06:34:09.617Z'),
    },
    { 
      nickname: '철수',
      commentcontent: '좋은 글이에요!',
      password: 'cheolsu1234',
      createdAt: new Date('2023-03-24T06:34:09.617Z'),
    },
    { 
      nickname: '영희',
      commentcontent: '정말 재밌네요!',
      password: 'younghee5678',
      createdAt: new Date('2023-03-25T06:34:09.617Z'),
    },
    { 
      nickname: '지민',
      commentcontent: '너무 멋진 사진이에요!',
      password: 'jimin91011',
      createdAt: new Date('2023-03-26T06:34:09.617Z'),
    },
    { 
      nickname: '하늘',
      commentcontent: '또 다른 포스팅 기대할게요!',
      password: 'haneul1234',
      createdAt: new Date('2023-03-27T06:34:09.617Z'),
    },
  ];
  
  const Postdata = [
    { 
      nickname: '민지',
      title: '해변에서의 하루',
      img: 'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg',
      description: '친구들과 해변에서 멋진 시간을 보냈습니다. 날씨가 완벽했어요!',
      tags: ['해변', '맑은 날', '친구'],
      place: '해운대 해수욕장, 부산',
      isPublic: true,
      password: 'minji1234',
      likes: 10,
      createdAt: new Date('2023-03-23T06:34:09.617Z'),
    },
    { 
      nickname: '철수',
      title: '내가 좋아하는 레시피',
      img: 'https://example.com/images/recipe.jpg',
      description: '김치를 만드는 내가 좋아하는 레시피입니다. 쉽고 맛있어요!',
      tags: ['요리', '레시피', '김치'],
      place: '집 주방',
      isPublic: false,
      password: 'cheolsu1234',
      likes: 5,
      createdAt: new Date('2023-03-24T06:34:09.617Z'),
    },
    { 
      nickname: '영희',
      title: '제주도 여행',
      img: 'https://example.com/images/jeju.jpg',
      description: '제주도는 아름다운 경치로 가득 찬 곳입니다!',
      tags: ['여행', '제주', '휴가'],
      place: '제주도',
      isPublic: true,
      password: 'younghee5678',
      likes: 12,
      createdAt: new Date('2023-03-25T06:34:09.617Z'),
    },
    { 
      nickname: '지민',
      title: '자바스크립트 배우기',
      img: 'https://example.com/images/javascript.jpg',
      description: '자바스크립트를 배우기 시작했는데, 정말 신나요!',
      tags: ['코딩', '자바스크립트', '학습'],
      place: '온라인',
      isPublic: true,
      password: 'jimin91011',
      likes: 7,
      createdAt: new Date('2023-03-26T06:34:09.617Z'),
    },
    { 
      nickname: '하늘',
      title: '가족 모임',
      img: 'https://example.com/images/family_reunion.jpg',
      description: '지난 주말 가족 모임이 정말 즐거웠어요!',
      tags: ['가족', '모임', '사랑'],
      place: '집',
      isPublic: true,
      password: 'haneul1234',
      likes: 3,
      createdAt: new Date('2023-03-27T06:34:09.617Z'),
    },
  ];
  
  // Export the data
  export { Groupdata, Commentdata, Postdata };
  