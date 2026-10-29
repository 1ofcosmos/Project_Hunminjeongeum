/* 모든 등장인물의 대사는 학습을 위한 창작입니다. */
window.GAME_DATA = {
  disclaimer: '본 게임은 역사적 사실과 국어 교과서의 내용을 바탕으로 재구성한 가상의 이야기입니다. 등장인물과 대화, 일부 사건은 학습을 위해 창작되었으며, 훈민정음의 창제 배경과 원리는 역사적 자료를 바탕으로 구성하였습니다.',
  opening: [
    '백성들에게는 저마다 전하고 싶은 말이 있었다. 그러나 그 마음을 글로 옮기는 일은 누구에게나 쉬운 일이 아니었다.',
    '누군가는 소식을 전하지 못했고, 누군가는 자신의 뜻을 글로 적지 못했다. 그들의 이야기는 마침내 왕의 귀에도 닿게 되었다.',
    '백성의 어려움을 헤아리던 임금, 세종. 어느 날, 왕은 한 사람의 조사관을 궁으로 불러 특별한 임무를 맡기려 하였다.'
  ],
  // 실제 파일명 기준입니다. 궁궐은 bg_place, 장터는 bg_markek으로 저장되어 있습니다.
  backgrounds: {
    palace:'assets/backgrounds/bg_place.png',
    map:'assets/backgrounds/bg_village_map.png',
    market:'assets/backgrounds/bg_markek.png',
    house:'assets/backgrounds/bg_house.png',
    school:'assets/backgrounds/bg_school.png',
    farm:'assets/backgrounds/bg_farm.png'
  },
  // 8장 모두 RGBA/알파 0~255 확인. bounds는 투명 여백을 제외한 [left,top,right,bottom].
  // 같은 인물의 두 표정은 이 영역의 높이와 중심을 맞춰 같은 무대에 겹쳐 표시합니다.
  npcVisuals: {
    kim_manbok: {
      basic:{src:'assets/characters/kimmanbok_basic.png',width:289,height:433,bounds:[73,4,272,422]},
      gomin:{src:'assets/characters/kimmanbok_gomin.png',width:289,height:433,bounds:[27,4,221,422]}
    },
    park_yeonhwa: {
      basic:{src:'assets/characters/bakyeonhwa_basic.png',width:289,height:433,bounds:[93,4,263,428]},
      gomin:{src:'assets/characters/bakyeonhwa_gomin.png',width:299,height:433,bounds:[33,4,204,430]}
    },
    lee_dohyeon: {
      basic:{src:'assets/characters/leedohyeon_basic.png',width:560,height:900,bounds:[87,7,438,889]},
      gomin:{src:'assets/characters/leedohyeon_gomin.png',width:560,height:900,bounds:[110,10,494,883]}
    },
    choi_deoksu: {
      basic:{src:'assets/characters/choiducksu_basic.png',width:724,height:1086,bounds:[210,13,603,1062]},
      gomin:{src:'assets/characters/choiducksu_gomin.png',width:641,height:1086,bounds:[107,17,488,1062]}
    }
  },
  cards: [
    '거래한 물건과 외상값을 직접 기록하기 어려워 다른 사람의 도움을 받아야 한다.',
    '장사에 필요한 내용을 스스로 적을 수 있도록 쉽게 익힐 문자가 필요하다.',
    '글을 알지 못해 멀리 있는 가족에게 직접 편지를 쓰기 어렵다.',
    '자신의 마음을 남에게 부탁하지 않고 글로 전하고 싶다.',
    '우리말과 한자는 서로 달라 우리말을 글로 그대로 나타내기 어렵다.',
    '한자의 음과 뜻을 빌린 표기 방법에도 한계가 있어 우리말에 알맞은 문자가 필요하다.',
    '글을 읽지 못해 생활에 필요한 기록을 다른 사람에게 읽어 달라고 부탁해야 한다.',
    '생업에 종사하는 백성도 쉽게 배우고 사용할 수 있는 문자가 필요하다.'
  ],
  categories: ['우리말 표현의 어려움', '백성들의 소통과 생활의 어려움', '쉽게 익혀 사용할 문자의 필요성'],
  people: [
    {name:'김만복',role:'장터의 상인',place:'장터',asset:'kim_manbok',bg:'market',pos:[20,49]},
    {name:'박연화',role:'가족을 그리는 어머니',place:'민가',asset:'park_yeonhwa',bg:'house',pos:[70,82]},
    {name:'이도현',role:'서당의 훈장',place:'서당',asset:'lee_dohyeon',bg:'school',pos:[74,53]},
    {name:'최덕수',role:'농가의 농부',place:'농가',asset:'choi_deoksu',bg:'farm',pos:[86,35]}
  ],
  spirits: [
    {phrase:'우리나라 말이 중국과 달라',original:'國之語音 異乎中國',meaning:'우리말에 알맞은 문자를 만들고자 한 정신.',answer:'자주'},
    {phrase:'내 이를 안타깝게 여겨',original:'予爲此憫然',meaning:'글을 몰라 어려움을 겪는 백성들을 안타깝게 여기고 도우려는 정신.',answer:'애민'},
    {phrase:'쉽게 익혀서 날마다 쓰는 데 편하게',original:'欲使人易習 便於日用耳',meaning:'누구나 쉽게 배우고 일상생활에서 편리하게 사용하도록 하려는 정신.',answer:'실용'}
  ],
  source:'https://contents.history.go.kr/front/hm/view.do?levelId=hm_091_0010',
  original:'國之語音 異乎中國 與文字不相流通 故愚民有所欲言 而終不得伸其情者多矣 予爲此憫然 新制二十八字 欲使人易習 便於日用耳',
  translation:'우리나라 말이 중국과 달라 한자와 서로 통하지 않으므로, 글을 모르는 백성들이 말하고 싶은 것이 있어도 끝내 제 뜻을 잘 표현하지 못하는 사람이 많다. 내 이를 안타깝게 여겨 새로 스물여덟 글자를 만들었으니, 사람들이 쉽게 익혀 날마다 쓰는 데 편하게 하고자 할 따름이다.'
};
