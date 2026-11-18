/* 모든 등장인물의 대사는 학습을 위한 창작입니다. */
window.GAME_DATA = {
  disclaimer: '본 게임은 역사적 사실과 국어 교과서의 내용을 바탕으로 재구성한 가상의 이야기입니다. 등장인물과 대화, 일부 사건은 학습을 위해 창작되었으며, 훈민정음의 창제 배경과 원리는 역사적 자료를 바탕으로 구성하였습니다.',
  opening: [
    '누구에게나 전하고 싶은 말은 있었다.\n\n그러나 그 마음을 글로 남기는 일은,\n누구에게나 쉬운 일이 아니었다.',
    '누군가는 소식을 전하지 못했고,\n누군가는 자신의 뜻을 글로 적지 못했다.\n\n그렇게 전해지지 못한 마음들이\n하나둘 쌓여 갔다.',
    '백성의 어려움을 헤아리던 임금, 세종.\n\n어느 날, 왕은 한 사람을 궁으로 불렀다.\n\n그리고 그에게 특별한 임무를 맡기려 하였다.'
  ],
  // 실제 파일명 기준입니다. 궁궐은 bg_place, 장터는 bg_markek으로 저장되어 있습니다.
  backgrounds: {
    palace:'assets/backgrounds/bg_place.png',
    map:'assets/backgrounds/bg_village_map.png',
    market:'assets/backgrounds/bg_markek.png',
    house:'assets/backgrounds/bg_house.png',
    school:'assets/backgrounds/bg_school.png',
    farm:'assets/backgrounds/bg_farm.png',
    jiphyeonjeon:'assets/backgrounds/bg_jiphyeonjeon.png',
    jiphyeonjeonSanghyeong:'assets/backgrounds/bg_jiphyeonjeon_sanghyeong.png'
  },
  // 2차시 자음 기본자 상형 탐구 목록입니다(ㄱ→ㄴ→ㅁ→ㅅ→ㅇ). 모음 기본자 등 후속 활동을 추가할 때는
  // 배열에 같은 형태({id,imageKey,title,guide,card,revealText,question})로 항목을 추가하면
  // sanghyeong()의 guide→card→reveal→question 흐름이 그대로 재사용됩니다.
  chapter2: {
    shapeActivities: [
      {
        id:'ㄱ',
        imageKey:'giyeok',
        title:"첫 번째 탐구 · 'ㄱ'에 담긴 비밀",
        guide:["먼저 'ㄱ'을 살펴보겠습니다. 혼자 천천히 '그, 그' 하고 발음해 보십시오."],
        card:{
          title:'혼자 발음하기',
          steps:["소리를 낼 때 혀의 어느 부분이 움직이는지 느껴 보세요."],
          button:'발음을 마쳤어요'
        },
        revealText:"이제 그림을 보며 다시 발음해 보세요. 혀의 어느 부분이 목구멍 쪽을 막는지 살펴보십시오.",
        question:{
          prompt:"'ㄱ'은 어떤 모양을 본떠 만들었을까요?",
          choices:['혀뿌리가 목구멍을 막는 모양','혀끝이 윗잇몸에 닿는 모양','입의 모양','이의 모양'],
          answer:'혀뿌리가 목구멍을 막는 모양',
          correctFeedback:"'ㄱ'은 혀뿌리가 목구멍을 막는 모양을 본뜬 글자입니다.",
          incorrectFeedback:'혀의 앞쪽과 뒤쪽 중 어느 부분이 움직이는지 그림을 살펴보며 다시 발음해 보세요.'
        }
      },
      {
        id:'ㄴ',
        imageKey:'nieun',
        title:"두 번째 탐구 · 'ㄴ'에 담긴 비밀",
        guide:["이번에는 'ㄴ'을 살펴보겠습니다. 혼자 '느, 느' 하고 발음해 보십시오."],
        card:{
          title:'혼자 발음하기',
          steps:['혀끝이 어디에 닿는지 느껴 보세요.'],
          button:'발음을 마쳤어요'
        },
        revealText:'이제 그림을 보며 다시 발음해 봅시다. 혀끝이 어느 부분에 닿는지 확인해 보세요.',
        question:{
          prompt:"'ㄴ'은 어떤 모양을 본뜬 글자일까요?",
          choices:['목구멍의 모양','혀끝이 윗잇몸에 닿는 모양','입의 모양','이의 모양'],
          answer:'혀끝이 윗잇몸에 닿는 모양',
          correctFeedback:"'ㄴ'은 혀끝이 윗잇몸에 닿는 모양을 본뜬 글자입니다.",
          incorrectFeedback:'혀끝이 윗니 바로 뒤의 어느 부분에 닿는지 다시 느껴 보세요.'
        }
      },
      {
        id:'ㅁ',
        imageKey:'mieum',
        title:"세 번째 탐구 · 'ㅁ'에 담긴 비밀",
        guide:["이번에는 짝과 함께 'ㅁ'을 살펴보겠습니다. 번갈아 '므, 므' 하고 발음해 보세요."],
        card:{
          title:'짝과 함께 관찰하기',
          steps:[
            '① 한 학생이 발음합니다.',
            '② 다른 학생이 입술의 움직임을 관찰합니다.',
            '③ 역할을 바꾸어 다시 발음합니다.',
            '④ 입술의 모양을 기억합니다.'
          ],
          button:'짝 활동을 마쳤어요'
        },
        revealText:'이제 그림과 비교하며 다시 발음해 보세요. 입술이 어떻게 움직이는지 살펴보십시오.',
        question:{
          prompt:"'ㅁ'은 어떤 모양을 본뜬 글자일까요?",
          choices:['입의 모양','혀끝의 모양','이의 모양','목구멍의 모양'],
          answer:'입의 모양',
          correctFeedback:"'ㅁ'은 입의 모양을 본뜬 글자입니다.",
          incorrectFeedback:'두 입술이 만나는 모습을 다시 관찰해 보세요.'
        }
      },
      {
        id:'ㅅ',
        imageKey:'siot',
        title:"네 번째 탐구 · 'ㅅ'에 담긴 비밀",
        guide:["이번에는 'ㅅ'을 살펴보겠습니다. 먼저 '스, 스' 하고 발음해 보세요."],
        card:{
          title:'이의 모양 관찰하기',
          steps:['소리를 낼 때 이와 혀의 위치를 느껴 보세요.'],
          button:'관찰을 마쳤어요'
        },
        revealText:'이제 그림을 살펴보세요. 글자의 모양은 어떤 발음기관과 닮았을까요?',
        question:{
          prompt:"'ㅅ'은 어떤 모양을 본뜬 글자일까요?",
          choices:['이의 모양','혀끝이 윗잇몸에 닿는 모양','입의 모양','목구멍의 모양'],
          answer:'이의 모양',
          correctFeedback:"'ㅅ'은 이의 모양을 본뜬 글자입니다. 이는 『훈민정음 해례』에 제시된 창제 원리입니다.",
          incorrectFeedback:'그림 속 치아의 모습을 자세히 살펴보세요.'
        }
      },
      {
        id:'ㅇ',
        imageKey:'ieung',
        title:"다섯 번째 탐구 · 'ㅇ'에 담긴 비밀",
        guide:['마지막은 \'ㅇ\'입니다. 이번에는 짝과 함께 입안과 목 안쪽의 구조를 살펴봅시다.'],
        card:{
          title:'짝과 함께 살펴보기',
          steps:[
            '① 짝과 입을 벌리고 입안의 모습을 관찰합니다.',
            '② 눈으로 확인하기 어려운 목구멍은 그림 자료를 통해 살펴봅니다.',
            '③ 그림 속 목구멍의 형태를 기억합니다.'
          ],
          button:'관찰을 마쳤어요'
        },
        revealText:'목구멍의 모습이 어떻게 표현되어 있습니까? 그 형태와 글자를 비교해 보세요.',
        question:{
          prompt:"'ㅇ'은 어떤 모양을 본뜬 글자일까요?",
          choices:['목구멍의 모양','혀뿌리가 목구멍을 막는 모양','혀끝이 윗잇몸에 닿는 모양','입의 모양'],
          answer:'목구멍의 모양',
          correctFeedback:"'ㅇ'은 목구멍의 모양을 본뜬 글자입니다.",
          incorrectFeedback:'입술 모양이 아니라 목 안쪽의 통로를 살펴보세요.'
        }
      }
    ],
    vowelStartButton:'모음 기본자 탐구 시작하기',
    // 모음 기본자 상형 탐구(하늘→땅→사람). 각 항목은 자음과 달리 그림 공개 전에
    // '모양 추측' 선택 단계(guessChoices)를 먼저 거칩니다.
    vowelActivities: [
      {
        id:'ㆍ',
        imageKey:'araea',
        label:'하늘',
        guessPrompt:'먼저 하늘의 모습을 살펴보겠습니다. 옛사람들은 하늘을 어떤 형태로 생각했을까요?',
        guessChoices:['둥근 모양','네모난 모양','세로로 긴 모양'],
        revealPrompt:'그림을 자세히 살펴보세요. 하늘 가운데 어떤 형태가 보입니까?',
        question:{
          prompt:'하늘의 둥근 모양을 본뜬 모음 기본자는 무엇일까요?',
          choices:['ㆍ','ㅡ','ㅣ'],
          answer:'ㆍ',
          correctFeedback:"잘 살펴보았습니다!\n'ㆍ'는 하늘의 둥근 모양을 본뜬 모음 기본자입니다.",
          incorrectFeedback:'하늘 그림의 가운데에 있는 검은 점을 다시 살펴보세요.\n그 모양과 닮은 글자를 찾아봅시다.'
        }
      },
      {
        id:'ㅡ',
        imageKey:'eu',
        label:'땅',
        guessPrompt:'이번에는 땅의 모습을 살펴보겠습니다. 넓게 펼쳐진 땅은 어떤 모습으로 보입니까?',
        guessChoices:['둥근 모습','평평하게 펼쳐진 모습','곧게 서 있는 모습'],
        revealPrompt:'그림 속 땅의 모습을 자세히 살펴보세요. 어떤 방향으로 선이 뻗어 있습니까?',
        question:{
          prompt:'땅의 평평한 모습을 본뜬 모음 기본자는 무엇일까요?',
          choices:['ㆍ','ㅡ','ㅣ'],
          answer:'ㅡ',
          correctFeedback:"정확합니다!\n'ㅡ'는 땅의 평평한 모양을 본뜬 모음 기본자입니다.",
          incorrectFeedback:'그림 속 땅의 가로선을 다시 살펴보세요.\n가로로 길게 뻗은 모음 기본자를 찾아봅시다.'
        }
      },
      {
        id:'ㅣ',
        imageKey:'i',
        label:'사람',
        guessPrompt:'마지막으로 사람의 모습을 살펴보겠습니다. 사람이 똑바로 서 있는 모습은 어떤 형태와 닮았을까요?',
        guessChoices:['둥근 모양','가로로 뻗은 모양','세로로 곧게 선 모양'],
        revealPrompt:'그림 속 사람과 옆에 있는 선을 비교해 보세요. 어떤 공통점이 보입니까?',
        question:{
          prompt:'사람이 서 있는 모습을 본뜬 모음 기본자는 무엇일까요?',
          choices:['ㆍ','ㅡ','ㅣ'],
          answer:'ㅣ',
          correctFeedback:"잘했습니다!\n'ㅣ'는 사람이 서 있는 모양을 본뜬 모음 기본자입니다.",
          incorrectFeedback:'사람이 곧게 서 있는 모습을 다시 살펴보세요.\n세로로 길게 뻗은 글자를 찾아봅시다.'
        }
      }
    ],
    vowelMatchSuccess: [
      {expression:'basic',text:"잘하셨습니다! 'ㆍ, ㅡ, ㅣ'는 각각 하늘, 땅, 사람의 모습을 본뜬 글자입니다."},
      {expression:'thinking',text:'자음 기본자는 발음기관의 모양을 본떴고, 모음 기본자는 하늘·땅·사람의 모습을 본떴습니다.'},
      {expression:'basic',text:'서로 본뜬 대상은 다르지만, 모두 어떤 모습의 형태를 본떠 만들었다는 공통점이 있습니다.'},
      {expression:'basic',text:"이것이 훈민정음 기본자의 '상형 원리'입니다."}
    ],
    // 자음·모음 상형 탐구를 마친 뒤 보여주는 정리 화면입니다. 이후 가획 탐구를 추가할 때
    // 이 객체 옆에 같은 형태로 gahoekSummary 등을 두고, '차시 선택 메뉴' 대신
    // 가획 탐구 시작 버튼으로 연결하면 자연스럽게 이어집니다.
    shapeSummary: {
      title:'상형 원리 탐구 완료',
      consonants:{label:'자음 기본자',letters:'ㄱ, ㄴ, ㅁ, ㅅ, ㅇ',desc:'발음기관의 모양을 본떠 만듦.'},
      vowels:{label:'모음 기본자',letters:'ㆍ, ㅡ, ㅣ',desc:'하늘, 땅, 사람의 모양을 본떠 만듦.'},
      common:{label:'공통 원리',title:'상형의 원리',desc:'어떤 대상의 모양을 본떠 글자를 만드는 원리.'},
      button:'상형 탐구 완료하기'
    },
    // 가획 원리 탐구: ① ㄱ→ㅋ, ② ㄴ→ㄷ→ㅌ(strokeSeries)는 글자 표시 영역(stroke-glyph-box) 위에
    // targets[].x/y(%) 좌표로 획을 놓을 자리를 겹쳐 놓고, 실제로 획이 더해지는 자리만 정답으로
    // 판정하는 드래그/클릭 퍼즐입니다. ③ ㅁ·ㅂ·ㅍ(orderSeries)는 역사적 자형 논란을 피하기
    // 위해 카드를 순서대로 배열 + 비교 질문으로 구성합니다.
    gahoek: {
      startButton:'가획 탐구 시작하기',
      strokeSeries: [
        {
          id:'giyeok-kieuk',
          guideLine:"먼저 기본자 'ㄱ'을 살펴보겠습니다. 획을 하나 더하면 어떤 글자가 될까요?",
          cardTitle:'획을 더해 글자를 완성해 보세요',
          steps:[
            {
              base:'ㄱ',result:'ㅋ',
              instruction:"아래에 있는 가로획을 끌어다가 'ㄱ'의 알맞은 위치에 놓아 'ㅋ'을 완성해 보세요.",
              targets:[
                {id:'correct',x:62,y:52,correct:true},
                {id:'wrong1',x:50,y:88,correct:false},
                {id:'wrong2',x:14,y:50,correct:false}
              ],
              correctFeedback:"잘하셨습니다!\n'ㄱ'에 획을 더하니 'ㅋ'이 되었습니다.",
              incorrectFeedback:'획이 더해지는 위치를 다시 살펴보세요.'
            }
          ]
        },
        {
          id:'nieun-digeut-tieut',
          guideLine:"이번에는 'ㄴ'에 획을 더해 보겠습니다. 획을 차례로 더하면 어떤 글자가 될까요?",
          cardTitle:'획을 차례로 더해 보세요',
          steps:[
            {
              base:'ㄴ',result:'ㄷ',
              instruction:"가로획을 끌어다가 'ㄴ'에 더해 'ㄷ'을 완성해 보세요.",
              targets:[
                {id:'correct',x:50,y:16,correct:true},
                {id:'wrong1',x:50,y:88,correct:false},
                {id:'wrong2',x:90,y:50,correct:false}
              ],
              correctFeedback:"'ㄴ'에 획을 더하니 'ㄷ'이 되었습니다.",
              incorrectFeedback:'기본자의 형태를 다시 살펴보고 획을 놓을 위치를 생각해 보세요.'
            },
            {
              base:'ㄷ',result:'ㅌ',
              instruction:"이제 'ㄷ'에 획을 하나 더하여 'ㅌ'을 완성해 보세요.",
              targets:[
                {id:'correct',x:50,y:50,correct:true},
                {id:'wrong1',x:50,y:88,correct:false},
                {id:'wrong2',x:90,y:50,correct:false}
              ],
              correctFeedback:"'ㄷ'에 획을 더하니 'ㅌ'이 되었습니다.",
              incorrectFeedback:'기본자의 형태를 다시 살펴보고 획을 놓을 위치를 생각해 보세요.'
            }
          ],
          completeFeedback:"좋습니다!\n'ㄴ'에 획이 더해져 'ㄷ'이 되고,\n다시 획이 더해져 'ㅌ'이 되었습니다."
        }
      ],
      orderSeries:{
        id:'mieum-bieup-pieup',
        guideLine:'이번에는 \'ㅁ\' 계열을 살펴보겠습니다. 이 계열은 오늘날의 글자 모양에 선을 아무렇게나 더하는 것보다 글자들의 형태와 관계를 비교하는 것이 중요합니다.',
        cardTitle:'글자의 변화 순서를 찾아보세요',
        intro:"아래의 'ㅁ', 'ㅂ', 'ㅍ' 카드를 살펴보세요. 기본자를 먼저 놓고, 획이 더해지는 관계에 따라 나머지 글자 카드를 차례로 배열해 보세요.",
        cards:['ㅂ','ㅍ','ㅁ'],
        answer:['ㅁ','ㅂ','ㅍ'],
        confirmButton:'정답 확인하기',
        incorrectFeedback:'어느 글자가 기본자이고, 어느 글자에 획이 더해졌는지 다시 비교해 보세요.',
        basicQuestion:{
          prompt:'세 글자 가운데 기본자는 무엇입니까?',
          choices:['ㅁ','ㅂ','ㅍ'],
          answer:'ㅁ',
          incorrectFeedback:'획이 더해지지 않은, 가장 단순한 글자를 다시 살펴보세요.'
        },
        principleQuestion:{
          prompt:'그렇다면 이 계열의 글자들은 어떤 원리에 따라 만들어졌다고 정리할 수 있을까요?',
          choices:['기본자에 획을 더하는 원리','글자의 모양을 무작위로 바꾸는 원리','서로 다른 글자를 합치는 원리'],
          answer:'기본자에 획을 더하는 원리',
          incorrectFeedback:"'ㅁ'에서 'ㅂ', 'ㅍ'으로 바뀌는 과정에서 무엇이 더해졌는지 다시 떠올려 보세요."
        },
        finalFeedback:"잘하셨습니다.\n'ㅁ'을 기본으로 'ㅂ', 'ㅍ'이 이어지는\n가획의 관계를 확인했습니다."
      },
      summary:{
        title:'가획의 원리를 정리해 봅시다',
        q1:'기본자에 무엇을 더하여 다른 글자를 만들었나요?',
        q2:'획을 더하는 과정과 소리의 변화에는 어떤 관계가 있나요?',
        principle:'자음 기본자에 소리가 세짐에 따라 획을 한 번이나 두 번 더하여 만듦.',
        button:'가획 탐구 완료하기'
      },
      completion:[
        {expression:'basic',text:'훌륭합니다. 직접 획을 더하고 글자를 비교하면서 가획의 원리를 살펴보았군요.'},
        {expression:'thinking',text:'이번에는 자음과 달리 모음 기본자를 결합하는 방법을 살펴볼 차례입니다.'},
        {expression:'basic',text:"하늘·땅·사람을 본뜬 기본자들이 어떻게 결합하여 다른 모음이 되는지 다음 탐구에서 알아봅시다."}
      ]
    },
    // 합성 원리 탐구: 모음 기본자 'ㆍ'(하늘의 둥근 모양을 본뜸)을 'ㅡ'(땅)·'ㅣ'(사람)의 위/아래/좌/우에
    // 겹치는 좌표(targets[].x/y)에 직접 배치해 초출자 ㅗ·ㅜ·ㅏ·ㅓ를 만드는 드래그/클릭 퍼즐입니다.
    // '하늘'·'땅'·'사람'은 글자 이름이 아니라 모음 기본자가 본뜬 대상이므로, 안내문에서는
    // 반드시 '모음 기본자 ㆍ/ㅡ/ㅣ'로 글자를 가리키고 하늘·땅·사람은 괄호 설명으로만 덧붙입니다.
    // 병서·합용은 다루지 않습니다.
    compose: {
      startButton:'합성 탐구 시작하기',
      basicQuiz:{
        prompt:'다음 중 훈민정음의 모음 기본자 세 글자를 바르게 나열한 것은 무엇일까요?',
        choices:['ㄱ, ㄴ, ㅁ','ㆍ, ㅡ, ㅣ','ㅏ, ㅓ, ㅗ'],
        answer:'ㆍ, ㅡ, ㅣ',
        correctFeedback:"정답입니다!\n모음 기본자 'ㆍ, ㅡ, ㅣ'는 각각 하늘의 둥근 모양, 땅의 평평한 모양, 사람이 서 있는 모양을 본떠 만든 글자입니다.",
        incorrectFeedback:'모음 기본자는 앞서 상형 원리 탐구에서 살펴본 세 글자입니다. 다시 떠올려 보세요.'
      },
      buildSeries:[
        {
          id:'o',base:'ㅡ',result:'ㅗ',
          guideLine:"먼저 모음 기본자 'ㅡ'와 'ㆍ'를 결합해 보겠습니다.",
          cardTitle:'모음 기본자를 결합해 보세요',
          instruction:"'ㅡ'의 위쪽에 'ㆍ'를 놓아 'ㅗ'를 만들어 보세요.",
          targets:[
            {id:'correct',x:50,y:18,correct:true},
            {id:'wrong1',x:50,y:82,correct:false}
          ],
          correctFeedback:"잘하셨습니다!\n모음 기본자 'ㅡ'의 위쪽에 'ㆍ'를 결합하여 'ㅗ'를 만들었습니다.",
          incorrectFeedback:"'ㆍ' 조각이 놓이는 위치를 다시 살펴보세요."
        },
        {
          id:'u',base:'ㅡ',result:'ㅜ',
          guideLine:"이번에는 모음 기본자 'ㅡ'의 다른 자리에 'ㆍ'를 놓아 보겠습니다.",
          cardTitle:'모음 기본자를 다시 결합해 보세요',
          instruction:"'ㅡ'의 아래쪽에 'ㆍ'를 놓아 'ㅜ'를 만들어 보세요.",
          targets:[
            {id:'correct',x:50,y:82,correct:true},
            {id:'wrong1',x:50,y:18,correct:false}
          ],
          correctFeedback:"잘하셨습니다!\n모음 기본자 'ㅡ'의 아래쪽에 'ㆍ'를 결합하여 'ㅜ'를 만들었습니다.",
          incorrectFeedback:"'ㆍ' 조각이 놓이는 위치를 다시 살펴보세요."
        },
        {
          id:'a',base:'ㅣ',result:'ㅏ',
          guideLine:"이제 모음 기본자 'ㅣ'와 'ㆍ'를 결합해 보겠습니다.",
          cardTitle:'모음 기본자를 결합해 보세요',
          instruction:"'ㅣ'의 오른쪽에 'ㆍ'를 놓아 'ㅏ'를 만들어 보세요.",
          targets:[
            {id:'correct',x:80,y:50,correct:true},
            {id:'wrong1',x:20,y:50,correct:false}
          ],
          correctFeedback:"잘하셨습니다!\n모음 기본자 'ㅣ'의 오른쪽에 'ㆍ'를 결합하여 'ㅏ'를 만들었습니다.",
          incorrectFeedback:"'ㆍ' 조각이 놓이는 위치를 다시 살펴보세요."
        },
        {
          id:'eo',base:'ㅣ',result:'ㅓ',
          guideLine:"모음 기본자 'ㅣ'의 다른 자리에도 'ㆍ'를 놓아 보겠습니다.",
          cardTitle:'모음 기본자를 다시 결합해 보세요',
          instruction:"'ㅣ'의 왼쪽에 'ㆍ'를 놓아 'ㅓ'를 만들어 보세요.",
          targets:[
            {id:'correct',x:20,y:50,correct:true},
            {id:'wrong1',x:80,y:50,correct:false}
          ],
          correctFeedback:"잘하셨습니다!\n모음 기본자 'ㅣ'의 왼쪽에 'ㆍ'를 결합하여 'ㅓ'를 만들었습니다.",
          incorrectFeedback:"'ㆍ' 조각이 놓이는 위치를 다시 살펴보세요."
        }
      ],
      completeFeedback:"훌륭합니다!\n모음 기본자 'ㆍ'를 'ㅡ', 'ㅣ'의 위아래와 좌우에 결합하여\n'ㅗ·ㅜ·ㅏ·ㅓ' 네 모음을 만들어 보았습니다.",
      summary:{
        title:'합성의 원리를 정리해 봅시다',
        principle:"모음 기본자 'ㆍ'를 'ㅡ', 'ㅣ'의 위·아래·왼쪽·오른쪽에 결합하여 새로운 모음을 만듦.",
        button:'합성 탐구 완료하기'
      },
      completion:[
        {expression:'basic',text:'아주 잘했습니다. 모음 기본자 ㆍ, ㅡ, ㅣ를 결합하여 새로운 모음자를 만드는 원리를 알아보았습니다.'},
        {expression:'thinking',text:'이것으로 상형, 가획, 합성의 세 가지 원리를 모두 살펴보았습니다.'},
        {expression:'basic',text:'그대가 집현전 학자로서 훈민정음의 창제 원리를 깊이 이해했음을 축하합니다.'}
      ]
    },
    // 가획·합성 원리 탐구를 마친 뒤 선택적으로 작성하는 짧은 정리 기록입니다. 각 항목은
    // 정해진 정리 문장(summary)과 한 줄 작성 질문(question)으로 구성되며, 서술형 보고서가
    // 아니라 짧은 입력창(質問 1개당 80자 제한)에 적는 간단한 정리 활동입니다.
    hapyeRecord: {
      title:'나의 해례 기록',
      intro:'집현전 학자들과 함께 탐구한 글자 만들기 원리를 정리해 보세요.',
      items:[
        {
          heading:'① 상형 원리',
          summary:'발음 기관의 모양을 본떠 자음 기본자 ㄱ, ㄴ, ㅁ, ㅅ, ㅇ을 만들었습니다.',
          question:'기억에 남는 글자와 그 까닭을 적어 보세요.',
          placeholder:'예: ㅇ, 목구멍의 둥근 모양이 인상적이어서'
        },
        {
          heading:'② 가획 원리',
          summary:'기본자에 획을 더하여 새로운 자음을 만들었습니다. 예: ㄱ → ㅋ',
          question:'탐구한 가획의 예를 하나 적어 보세요.',
          placeholder:'예: ㄴ → ㄷ'
        },
        {
          heading:'③ 합성 원리',
          summary:"모음 기본자 'ㆍ, ㅡ, ㅣ'(하늘, 땅, 사람의 모습을 본뜬 글자)를 결합하여 모음을 만들었습니다.",
          question:'기본 요소가 결합한 모음의 예를 적어 보세요.',
          placeholder:'예: ㅗ'
        }
      ],
      padletNote:'완성한 해례 기록을 화면 캡처하여 학급 Padlet에 공유해 보세요.',
      saveButton:'해례 기록 저장하기'
    }
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
    {phrase:'우리나라 말이 중국과 달라',original:'國之語音 異乎中國',meaning:'우리말은 중국어와 달라 중국어를 표기하는 한자로는 우리의 말소리를 잘 적을 수 없음.',answer:'자주'},
    {phrase:'내 이를 안타깝게 여겨',original:'予爲此憫然',meaning:'백성들이 자신의 생각을 표현할 수 있는 우리 글자가 없는 것을 안타깝게 여김.',answer:'애민'},
    {phrase:'쉽게 익혀서 날마다 쓰는 데 편하게',original:'欲使人易習 便於日用耳',meaning:'누구나 쉽게 배워서 일상에서 편하게 쓸 수 있는 문자를 만들고자 함.',answer:'실용'}
  ],
  source:'https://contents.history.go.kr/front/hm/view.do?levelId=hm_091_0010',
  original:'國之語音 異乎中國 與文字不相流通 故愚民有所欲言 而終不得伸其情者多矣 予爲此憫然 新制二十八字 欲使人易習 便於日用耳',
  translation:'우리나라 말이 중국과 달라 한자와 서로 통하지 않으므로, 글을 모르는 백성들이 말하고 싶은 것이 있어도 끝내 제 뜻을 잘 표현하지 못하는 사람이 많다. 내 이를 안타깝게 여겨 새로 스물여덟 글자를 만들었으니, 사람들이 쉽게 익혀 날마다 쓰는 데 편하게 하고자 할 따름이다.',
  // 3차시 「한글 홍보 프로젝트」: 1차시에서 만난 백성 4명을 반포 이후에 다시 만나 달라진 생활을
  // 듣고 변화 기록 카드를 모으는 탐방 활동입니다. npcChange의 각 항목은 1차시 npcDialogues의
  // 실제 고충(intro/questions)을 바탕으로 한 가상의 후속 이야기이며, 긴 글쓰기·홍보 기획서
  // 작성 화면은 포함하지 않습니다(교사의 후속 수업에서 진행).
  chapter3: {
    // 3차시 전용 '밝은 표정' 보조 자료입니다. basic/gomin 프레임은 npcVisuals(1차시)의 값을
    // 그대로 재사용하고, 여기에는 happy 프레임의 실제 PNG 치수·투명 여백 제외 bounds([left,top,
    // right,bottom], 2px 간격 알파 스캔으로 측정)만 추가합니다. npc3Sprite()가 세 프레임의
    // bounds 높이를 기준으로 비율을 맞춰, 표정이 바뀌어도 발 위치·중심·크기가 흔들리지
    // 않도록 합니다(1차시 npcSprite()와 같은 방식, 1차시 코드/데이터는 건드리지 않음).
    npcHappyVisual: {
      kim_manbok:{src:'assets/characters/kimmanbok_happy.png',width:377,height:807,bounds:[24,16,376,782]},
      park_yeonhwa:{src:'assets/characters/bakyeonhwa_happy.png',width:341,height:799,bounds:[24,24,318,774]},
      lee_dohyeon:{src:'assets/characters/leedohyeon_happy.png',width:357,height:814,bounds:[24,14,332,788]},
      choi_deoksu:{src:'assets/characters/choiducksu_happy.png',width:331,height:812,bounds:[24,12,306,786]}
    },
    villageNotice:{
      title:'다시 찾은 마을',
      text:'훈민정음이 반포되고 시간이 흐른 뒤, 다시 마을을 찾았습니다.'
    },
    compareIntro:'네 사람을 다시 만나 들은 이야기를 한눈에 살펴봅시다.',
    reflection:{
      title:'나의 생각',
      question:'백성들의 달라진 모습을 살펴보면서 어떤 생각이나 느낌이 들었나요?',
      guide:'가장 기억에 남는 변화나 새롭게 느낀 점을 1~2문장으로 적어 보세요.'
    },
    completion:{
      title:'집현전에서의 마지막 임무를 마쳤습니다.',
      body:[
        '지금까지 살펴본 훈민정음의 창제 정신과 글자 만들기 원리, 백성들의 변화를 떠올려 보세요.',
        '이제 훈민정음의 가치를 더 많은 사람에게 알릴 홍보물을 만들어 봅시다.'
      ]
    },
    npcChange: {
      kim_manbok: {
        greeting:[
          {speaker:'npc',text:'아니, 이게 누구시오! 그때 그 조사하러 다니시던 분 아니시오? 어서 오시오, 어서 오시오!',expression:'happy'},
          {speaker:'investigator',text:'다시 뵙게 되어 반갑습니다. 그동안 잘 지내셨습니까?'},
          {speaker:'npc',text:'잘 지냈지요! 그런데 요즘 나한테 아주 재미난 일이 하나 생겼다오.',expression:'happy'},
          {speaker:'investigator',text:'무슨 일이십니까?'},
          {speaker:'npc',text:'글쎄, 내가 요즘 그 새 글자를 조금씩 익히고 있지 않겠소!',expression:'happy'}
        ],
        idle:'내 이야기가 더 궁금하면 무엇이든 물어보시오.',
        idleExpression:'happy',
        questions:[
          {
            id:'q1',label:'새로운 글자를 배우고 무엇이 달라졌나요?',
            lines:[
              {speaker:'investigator',text:'새로운 글자를 배우고 무엇이 달라졌나요?'},
              {speaker:'npc',text:'전에는 외상값을 적지 못해 늘 애를 먹었잖소. 이제는 서툴어도 내 손으로 숫자랑 이름 정도는 적어 둘 수 있게 되었소.',expression:'gomin'},
              {speaker:'investigator',text:'직접 기록하시니 마음이 한결 편해지셨겠군요.'},
              {speaker:'npc',text:'그렇다오! 손님과 얼굴 붉힐 일도 줄었고, 누구한테 부탁할 필요도 없어졌지.',expression:'happy'},
              {speaker:'investigator',text:'장사에 큰 도움이 되었겠습니다.'},
              {speaker:'npc',text:'암, 그렇지. 글자가 쉬우니 나 같은 장사꾼도 짬짬이 익힐 수 있더구려.',expression:'happy'}
            ]
          },
          {
            id:'q2',label:'글자를 배우면서 어려웠던 점도 있었나요?',
            lines:[
              {speaker:'investigator',text:'글자를 배우면서 어려웠던 점도 있었나요?'},
              {speaker:'npc',text:'그럼요. 장사하다 말고 틈틈이 배우려니 쉽지 않았소. 아직도 모르는 글자가 수두룩하오.',expression:'gomin'},
              {speaker:'investigator',text:'그래도 꾸준히 익히고 계시는군요.'},
              {speaker:'npc',text:'그렇소. 하지만 전에 배우던 한자보다는 훨씬 쉬워서, 포기하지 않고 계속하게 되더구려.',expression:'gomin'},
              {speaker:'investigator',text:'조금씩이라도 나아지고 있다는 게 중요한 것 같습니다.'},
              {speaker:'npc',text:'맞는 말씀이오! 언젠가는 장부를 전부 내 손으로 적는 날이 오지 않겠소.',expression:'happy'}
            ]
          }
        ],
        farewell:{speaker:'npc',text:'이렇게 또 찾아와 내 이야기를 들어 주니 고맙구려. 전하께도 잘 전해 주시오!',expression:'happy'},
        card:{
          before:'거래한 물건과 외상값을 직접 기록하기 어려워 다른 사람의 도움을 받아야 했습니다.',
          after:'서툴지만 새 글자로 숫자와 이름을 직접 적을 수 있게 되어, 장부를 스스로 기록하기 시작했습니다.',
          meaning:'글자를 배우며 스스로 기록하는 즐거움과 자신감을 얻었습니다.'
        }
      },
      park_yeonhwa: {
        greeting:[
          {speaker:'npc',text:'어머, 조사관님! 다시 뵈니 정말 반갑습니다.',expression:'happy'},
          {speaker:'investigator',text:'그동안 잘 지내셨습니까?'},
          {speaker:'npc',text:'네, 덕분에요. 그런데 꼭 들려드리고 싶은 이야기가 있어요.',expression:'basic'},
          {speaker:'investigator',text:'무슨 이야기신가요?'},
          {speaker:'npc',text:'제가 얼마 전에, 태어나서 처음으로 아들에게 편지를 직접 써 보냈답니다.',expression:'happy'}
        ],
        idle:'더 궁금한 점이 있으면 편하게 물어보세요.',
        idleExpression:'basic',
        questions:[
          {
            id:'q1',label:'새로운 글자를 배우고 무엇이 달라졌나요?',
            lines:[
              {speaker:'investigator',text:'새로운 글자를 배우고 무엇이 달라졌나요?'},
              {speaker:'npc',text:'서툰 글씨였지만 "밥은 잘 먹고 있는지, 몸은 건강한지" 하는 제 마음을 처음으로 직접 적었어요.',expression:'happy'},
              {speaker:'investigator',text:'얼마나 벅차셨을지 짐작이 됩니다.'},
              {speaker:'npc',text:'눈물이 다 나더군요. 남의 손을 빌리지 않고 제 마음을 그대로 전할 수 있다는 게 이런 거구나 싶었어요.',expression:'gomin'},
              {speaker:'investigator',text:'아드님도 많이 기뻐했겠습니다.'},
              {speaker:'npc',text:'그렇다네요! 어머니 글씨를 직접 받아 보니 더 반가웠다고 답장이 왔답니다.',expression:'happy'}
            ]
          },
          {
            id:'q2',label:'글자를 배우면서 어려웠던 점도 있었나요?',
            lines:[
              {speaker:'investigator',text:'글자를 배우면서 어려웠던 점도 있었나요?'},
              {speaker:'npc',text:'익히는 데 시간이 꽤 걸렸어요. 집안일을 하면서 짬짬이 배우다 보니 더디기도 했고요.',expression:'gomin'},
              {speaker:'investigator',text:'그래도 끝까지 배우셨군요.'},
              {speaker:'npc',text:'아들에게 제 마음을 전하고 싶다는 생각 하나로 버텼지요. 다행히 글자 모양이 어렵지 않아 포기하지 않을 수 있었어요.',expression:'gomin'},
              {speaker:'investigator',text:'그 마음이 참 따뜻하게 느껴집니다.'},
              {speaker:'npc',text:'이제는 짧은 안부 편지 정도는 혼자서도 쓸 수 있게 되었답니다.',expression:'happy'}
            ]
          }
        ],
        farewell:{speaker:'npc',text:'제 이야기를 또 들어 주셔서 고맙습니다. 부디 평안히 다녀가세요.',expression:'happy'},
        card:{
          before:'멀리 떠난 아들에게 직접 편지를 쓰기 어려워 자신의 마음을 글로 전하지 못했습니다.',
          after:'서툴지만 새 글자를 익혀, 태어나서 처음으로 아들에게 직접 편지를 써 보냈습니다.',
          meaning:'자신의 마음을 스스로 전할 수 있게 되어 큰 위로와 기쁨을 느꼈습니다.'
        }
      },
      lee_dohyeon: {
        greeting:[
          {speaker:'npc',text:'오셨습니까. 마침 서당 아이들과 함께 새 글자를 가르치던 참이었습니다.',expression:'happy'},
          {speaker:'investigator',text:'서당에 변화가 있었나 봅니다.'},
          {speaker:'npc',text:'그렇습니다. 전에 나누었던 이야기가 떠오르더군요.',expression:'gomin'},
          {speaker:'investigator',text:'어떤 이야기 말씀이십니까?'},
          {speaker:'npc',text:'우리말에 맞는 쉬운 글자가 있다면 좋겠다 했던 그 말씀 말입니다.',expression:'basic'}
        ],
        idle:'더 알고 싶은 점이 있으면 말씀해 주십시오.',
        idleExpression:'basic',
        questions:[
          {
            id:'q1',label:'새로운 글자를 배우고 무엇이 달라졌나요?',
            lines:[
              {speaker:'investigator',text:'새로운 글자를 배우고 무엇이 달라졌나요?'},
              {speaker:'npc',text:'아이들이 한자를 배울 때보다 훨씬 빠르게 글자를 깨치는 것이 눈에 보입니다.',expression:'happy'},
              {speaker:'investigator',text:'구체적으로 어떤 점이 달라졌습니까?'},
              {speaker:'npc',text:'소리와 모양이 서로 통하는 글자이니, 한 번 원리를 익히면 스스로 읽고 쓰는 아이들이 늘었습니다.',expression:'gomin'},
              {speaker:'investigator',text:'선생님의 바람이 이루어진 셈이군요.'},
              {speaker:'npc',text:'그렇습니다. 말과 글이 가까워지니 가르치는 저도 한결 보람을 느낍니다.',expression:'happy'}
            ]
          },
          {
            id:'q2',label:'글자를 배우면서 어려웠던 점도 있었나요?',
            lines:[
              {speaker:'investigator',text:'글자를 배우면서 어려웠던 점도 있었나요?'},
              {speaker:'npc',text:'아이들은 빠르지만, 어른들 중에는 여전히 낯설어하는 분들도 많습니다.',expression:'basic'},
              {speaker:'investigator',text:'모두가 쉽게 익히는 것은 아니군요.'},
              {speaker:'npc',text:'그렇습니다. 익숙한 것을 바꾸는 데는 시간이 필요한 법이지요. 그래도 조금씩 배우는 이들이 늘고 있습니다.',expression:'gomin'},
              {speaker:'investigator',text:'변화에는 시간이 걸리는 법이겠지요.'},
              {speaker:'npc',text:'맞습니다. 다만 쉬운 글자라는 점이, 그 시간을 많이 줄여 주고 있는 것은 분명합니다.',expression:'happy'}
            ]
          }
        ],
        farewell:{speaker:'npc',text:'제 생각을 귀담아들어 주셔서 감사합니다. 앞으로도 좋은 결실이 있기를 바랍니다.',expression:'happy'},
        card:{
          before:'우리말과 한자가 서로 달라, 배운 사람도 우리말을 글로 온전히 나타내기 어려웠습니다.',
          after:'서당 아이들이 한자보다 훨씬 빠르게 새 글자를 깨치며, 스스로 읽고 쓰는 모습이 늘었습니다.',
          meaning:'우리말에 맞고 배우기 쉬운 글자가 가르침과 배움의 간격을 줄여 주었습니다.'
        }
      },
      choi_deoksu: {
        greeting:[
          {speaker:'npc',text:'허허, 이게 누구시오! 다시 오실 줄 몰랐소.',expression:'happy'},
          {speaker:'investigator',text:'잘 지내셨습니까?'},
          {speaker:'npc',text:'덕분에 잘 지냈소. 그런데 나한테 아주 신기한 일이 생겼다오.',expression:'basic'},
          {speaker:'investigator',text:'무슨 일이십니까?'},
          {speaker:'npc',text:'내가, 이 나이에 글자를 배우고 있지 않겠소!',expression:'happy'}
        ],
        idle:'더 듣고 싶은 이야기가 있으면 물어보시오.',
        idleExpression:'basic',
        questions:[
          {
            id:'q1',label:'새로운 글자를 배우고 무엇이 달라졌나요?',
            lines:[
              {speaker:'investigator',text:'새로운 글자를 배우고 무엇이 달라졌나요?'},
              {speaker:'npc',text:'아직 서툴지만, 이제는 농사일 적힌 쪽지 몇 글자는 나도 알아볼 수 있게 되었소.',expression:'basic'},
              {speaker:'investigator',text:'직접 읽으실 수 있게 되셨군요.'},
              {speaker:'npc',text:'그렇소! 누구한테 읽어 달라 부탁할 필요가 줄어드니 얼마나 편한지 모르오.',expression:'happy'},
              {speaker:'investigator',text:'큰 변화이시네요.'},
              {speaker:'npc',text:'그뿐이 아니오. 사실은… 밤에 아이가 몰래 나한테 글자를 가르쳐 주고 있다오.',expression:'happy'}
            ]
          },
          {
            id:'q2',label:'글자를 배우면서 어려웠던 점도 있었나요?',
            lines:[
              {speaker:'investigator',text:'글자를 배우면서 어려웠던 점도 있었나요?'},
              {speaker:'npc',text:'하루 종일 밭일을 하고 나면 몸이 지쳐서, 배울 힘을 내기가 쉽지 않소.',expression:'basic'},
              {speaker:'investigator',text:'그래도 꾸준히 배우고 계시네요.'},
              {speaker:'npc',text:'글자가 쉬우니 조금씩이라도 늘려 갈 수 있더구려. 전 같으면 엄두도 못 냈을 일이오.',expression:'gomin'},
              {speaker:'investigator',text:'쉬운 글자라서 포기하지 않을 수 있었던 거군요.'},
              {speaker:'npc',text:'그렇소. 이러다 보면 내 자식들한테도 떳떳하게 글을 가르쳐 줄 날이 오겠지.',expression:'happy'}
            ]
          }
        ],
        farewell:{speaker:'npc',text:'내 이야기를 이렇게 또 들어 주다니, 참으로 고맙구려. 조심히 돌아가시오.',expression:'happy'},
        card:{
          before:'글을 읽지 못해 농사일에 필요한 기록을 다른 사람에게 읽어 달라고 부탁해야 했습니다.',
          after:'서툴지만 새 글자를 배워 농사일 쪽지의 몇 글자를 직접 읽을 수 있게 되었고, 밤마다 자녀에게 글자를 배우고 있습니다.',
          meaning:'쉬운 글자 덕분에 나이와 상황에 관계없이 글을 배울 용기를 얻었습니다.'
        }
      }
    }
  }
};
