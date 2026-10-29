/* 학습용 창작 대화. NPC의 모든 대사에 expression을 명시합니다.
 * 조사관 대사에는 표정을 지정하지 않으며 직전 NPC 표정을 유지합니다. */
window.GAME_DATA.npcDialogues = {
  "kim_manbok": {
    "intro": [
      {
        "speaker": "npc",
        "text": "어서 오시오! 곡식도 있고 베도 있으니 한번 보고 가시오!",
        "expression": "basic"
      },
      {
        "speaker": "investigator",
        "text": "물건을 사러 온 건 아닙니다. 백성들이 글을 사용하면서 겪는 어려움을 알아보고 있습니다."
      },
      {
        "speaker": "npc",
        "text": "글이오? 허허, 마침 잘 오셨구려. 내가 요즘 그 글 때문에 골치가 아프다오.",
        "expression": "gomin"
      },
      {
        "speaker": "investigator",
        "text": "무슨 일이 있으십니까?"
      },
      {
        "speaker": "npc",
        "text": "아까 누가 베를 외상으로 가져갔는데, 얼마를 받아야 하는지 기록해 두질 못했소.",
        "expression": "gomin"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "label": "장부를 적지 못하면 어떤 일이 생깁니까?",
        "card": 0,
        "lines": [
          {
            "speaker": "investigator",
            "text": "장부를 적지 못하면 어떤 일이 생깁니까?"
          },
          {
            "speaker": "npc",
            "text": "말로는 기억해 두지요. 그런데 거래가 한두 번이어야 말이지.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "외상값이 헷갈릴 때도 있겠군요."
          },
          {
            "speaker": "npc",
            "text": "그렇소! 손님은 분명 갚았다고 하고, 나는 못 받았다고 생각하니 서로 얼굴을 붉히게 되지 않겠소?",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "그때마다 글을 아는 사람에게 부탁하시나요?"
          },
          {
            "speaker": "npc",
            "text": "그렇지요. 내 장사인데 장부 하나 내 손으로 적지 못하니 답답한 노릇이오.",
            "expression": "gomin"
          }
        ]
      },
      {
        "id": "q2",
        "label": "글을 아는 사람에게 부탁하면 되지 않습니까?",
        "card": null,
        "lines": [
          {
            "speaker": "investigator",
            "text": "글을 아는 사람에게 부탁하면 되지 않습니까?"
          },
          {
            "speaker": "npc",
            "text": "물론 부탁하지요. 허나 그 사람이 매번 여기 있는 것도 아니지 않소?",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "거래가 생길 때마다 기다려야 한다는 말씀이군요."
          },
          {
            "speaker": "npc",
            "text": "맞소. 급할 때는 손님을 세워 둔 채 사람을 찾으러 가야 하오.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "글을 직접 쓸 수 있다면 그런 불편은 줄겠네요."
          },
          {
            "speaker": "npc",
            "text": "그렇지! 내 일은 내 손으로 처리할 수 있으니 얼마나 좋겠소?",
            "expression": "basic"
          }
        ]
      },
      {
        "id": "q3",
        "label": "어떤 글자가 있으면 좋겠습니까?",
        "card": 1,
        "lines": [
          {
            "speaker": "investigator",
            "text": "어떤 글자가 있으면 좋겠습니까?"
          },
          {
            "speaker": "npc",
            "text": "글이란 게 꼭 오래 배운 사람만 쓸 수 있는 것이어야 하오?",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "쉽게 배울 수 있는 글자를 바라시는군요."
          },
          {
            "speaker": "npc",
            "text": "그렇소. 장사하는 사람도 익혀서 물건값이며 외상값을 직접 적을 수 있다면 좋겠소.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "말씀을 기록해 두겠습니다."
          },
          {
            "speaker": "npc",
            "text": "허허, 나중에는 나도 직접 기록하는 날이 왔으면 좋겠구려.",
            "expression": "basic"
          }
        ]
      }
    ],
    "prompt": {
      "speaker": "npc",
      "text": "내 장부 이야기가 궁금하시오? 무엇이든 물어보시오.",
      "expression": "basic"
    },
    "ack": {
      "speaker": "npc",
      "text": "내 사정을 이렇게 귀담아들어 주니 고맙소.",
      "expression": "basic"
    },
    "farewell": {
      "speaker": "npc",
      "text": "이제 다른 이들의 사정도 살펴보시오. 전하께 내 이야기 잘 전해 주시구려.",
      "expression": "basic"
    }
  },
  "park_yeonhwa": {
    "intro": [
      {
        "speaker": "npc",
        "text": "멀리서 오셨군요. 이 누추한 곳까지 어쩐 일이십니까?",
        "expression": "basic"
      },
      {
        "speaker": "investigator",
        "text": "백성들이 글을 사용하면서 겪는 어려움을 알아보고 있습니다."
      },
      {
        "speaker": "npc",
        "text": "글이라… 마침 저도 글 때문에 마음이 답답하던 참이었답니다.",
        "expression": "gomin"
      },
      {
        "speaker": "investigator",
        "text": "무슨 사연이 있으십니까?"
      },
      {
        "speaker": "npc",
        "text": "멀리 떠난 아들에게 소식을 전하고 싶지만 제 손으로는 편지를 쓸 줄 모른답니다.",
        "expression": "gomin"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "label": "다른 사람에게 편지를 부탁할 수는 없습니까?",
        "card": 3,
        "lines": [
          {
            "speaker": "investigator",
            "text": "다른 사람에게 편지를 부탁할 수는 없습니까?"
          },
          {
            "speaker": "npc",
            "text": "그럴 수는 있지요. 실제로 부탁해 본 적도 있고요.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "그런데도 어려움이 있으신가요?"
          },
          {
            "speaker": "npc",
            "text": "아들에게 전하고 싶은 마음을 남 앞에서 하나하나 말하는 게 쉽지 않더군요.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "가족에게만 전하고 싶은 말도 있으시겠군요."
          },
          {
            "speaker": "npc",
            "text": "그렇지요. 내 마음을 내 손으로 적을 수 있다면 얼마나 좋을까요.",
            "expression": "basic"
          }
        ]
      },
      {
        "id": "q2",
        "label": "아드님께 어떤 말씀을 전하고 싶으십니까?",
        "card": 2,
        "lines": [
          {
            "speaker": "investigator",
            "text": "아드님께 어떤 말씀을 전하고 싶으십니까?"
          },
          {
            "speaker": "npc",
            "text": "밥은 잘 먹는지, 아픈 데는 없는지… 그런 것들이지요.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "아드님이 많이 보고 싶으신가 봅니다."
          },
          {
            "speaker": "npc",
            "text": "어미 마음이 다 그렇지 않겠습니까. 그저 무사하다는 소식만 들어도 좋겠어요.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "그 마음을 편지에 담아 보내실 수 있다면 좋겠습니다."
          },
          {
            "speaker": "npc",
            "text": "그러게 말입니다. 하지만 저는 글을 쓰지 못하니 그조차 마음대로 할 수가 없네요.",
            "expression": "gomin"
          }
        ]
      },
      {
        "id": "q3",
        "label": "직접 편지를 쓸 수 있다면 어떨 것 같습니까?",
        "card": null,
        "lines": [
          {
            "speaker": "investigator",
            "text": "직접 편지를 쓸 수 있다면 어떨 것 같습니까?"
          },
          {
            "speaker": "npc",
            "text": "누구에게 부탁하지 않고 마음이 생각날 때마다 글을 적고 싶어요.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "다른 사람에게 말하기 어려운 내용도 적으실 수 있겠군요."
          },
          {
            "speaker": "npc",
            "text": "그렇지요. 특별한 말이 아니라도 좋습니다. 오늘 날씨가 좋았다든지, 아들이 좋아하던 음식을 만들었다든지요.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "그런 일상의 이야기가 아드님께는 큰 위로가 될지도 모르겠습니다."
          },
          {
            "speaker": "npc",
            "text": "그러면 참 좋겠네요. 글을 배우는 일이 조금만 더 쉬웠으면 좋겠습니다.",
            "expression": "basic"
          }
        ]
      }
    ],
    "prompt": {
      "speaker": "npc",
      "text": "제 마음을 더 말씀드려도 괜찮을까요?",
      "expression": "basic"
    },
    "ack": {
      "speaker": "npc",
      "text": "제 마음을 잊지 않고 기록해 주셔서 고마워요.",
      "expression": "basic"
    },
    "farewell": {
      "speaker": "npc",
      "text": "제 이야기가 다른 백성들에게도 도움이 되면 좋겠어요. 부디 조심히 다녀오세요.",
      "expression": "basic"
    }
  },
  "lee_dohyeon": {
    "intro": [
      {
        "speaker": "npc",
        "text": "어서 오십시오. 아이들에게 가르칠 글을 살펴보고 있던 참입니다.",
        "expression": "basic"
      },
      {
        "speaker": "investigator",
        "text": "백성들이 글을 사용하며 겪는 어려움을 조사하고 있습니다."
      },
      {
        "speaker": "npc",
        "text": "그렇다면 한 가지 생각해 볼 문제가 있습니다. 우리가 사용하는 말과 글은 과연 얼마나 잘 맞을까요?",
        "expression": "gomin"
      },
      {
        "speaker": "investigator",
        "text": "우리말과 한자가 서로 다르다는 말씀입니까?"
      },
      {
        "speaker": "npc",
        "text": "그렇습니다. 우리말의 뜻과 소리를 그대로 적기 어려운 경우가 있습니다.",
        "expression": "gomin"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "label": "한자를 잘 아셔도 그런 어려움이 있습니까?",
        "card": 4,
        "lines": [
          {
            "speaker": "investigator",
            "text": "한자를 잘 아셔도 그런 어려움이 있습니까?"
          },
          {
            "speaker": "npc",
            "text": "한자를 아는 것과 우리말을 온전히 적는 것은 다른 문제입니다.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "어떤 점에서 그렇습니까?"
          },
          {
            "speaker": "npc",
            "text": "한자는 본래 중국어를 적기 위해 만들어진 글자이니, 우리말의 표현을 그대로 옮기기에는 맞지 않는 부분이 있지요.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "배운 사람도 어려움을 느낀다면 글을 모르는 백성은 더 힘들겠군요."
          },
          {
            "speaker": "npc",
            "text": "바로 그것입니다. 글의 문제는 단지 배우기 어렵다는 데에만 있지 않습니다.",
            "expression": "gomin"
          }
        ]
      },
      {
        "id": "q2",
        "label": "옛날부터 쓰던 다른 표기 방법은 없습니까?",
        "card": 5,
        "lines": [
          {
            "speaker": "investigator",
            "text": "옛날부터 쓰던 다른 표기 방법은 없습니까?"
          },
          {
            "speaker": "npc",
            "text": "물론 있었습니다. 한자의 음과 뜻을 빌려 우리말을 적는 방법도 사용해 왔지요.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "그렇다면 그 방법으로 충분하지 않습니까?"
          },
          {
            "speaker": "npc",
            "text": "도움이 되기는 하지만 배우고 사용하기가 복잡하고, 우리말을 표현하는 데에도 한계가 있습니다.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "우리말에 더 잘 맞는 글자가 있다면 어떨까요?"
          },
          {
            "speaker": "npc",
            "text": "말과 글 사이의 간격을 줄이는 데 큰 도움이 되겠지요.",
            "expression": "basic"
          }
        ]
      },
      {
        "id": "q3",
        "label": "우리말에 알맞은 글자가 있다면 무엇이 달라질까요?",
        "card": null,
        "lines": [
          {
            "speaker": "investigator",
            "text": "우리말에 알맞은 글자가 있다면 무엇이 달라질까요?"
          },
          {
            "speaker": "npc",
            "text": "사람들이 자신의 말을 글로 나타내기가 더 수월해질 것입니다.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "그러면 글을 배우는 사람도 늘어날 수 있을까요?"
          },
          {
            "speaker": "npc",
            "text": "배우기 쉬운 구조까지 갖추고 있다면 그 가능성은 더 커지겠지요.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "우리말에 맞는 글자라는 점과 배우기 쉽다는 점이 모두 중요하군요."
          },
          {
            "speaker": "npc",
            "text": "그렇습니다. 다만 좋은 글자가 생긴다고 모두가 곧바로 글을 익히는 것은 아니겠지요.",
            "expression": "gomin"
          }
        ]
      }
    ],
    "prompt": {
      "speaker": "npc",
      "text": "말과 글의 관계에서 어떤 점이 궁금하십니까?",
      "expression": "basic"
    },
    "ack": {
      "speaker": "npc",
      "text": "지금 나눈 이야기가 우리말에 알맞은 문자를 생각하는 단서가 되겠군요.",
      "expression": "basic"
    },
    "farewell": {
      "speaker": "npc",
      "text": "백성들의 사연과 함께 이 문제를 살펴 주십시오. 조사에 좋은 결실이 있기를 바랍니다.",
      "expression": "basic"
    }
  },
  "choi_deoksu": {
    "intro": [
      {
        "speaker": "npc",
        "text": "이 먼 곳까지 웬일이시오? 보시다시피 농사일밖에 없는 곳인데.",
        "expression": "basic"
      },
      {
        "speaker": "investigator",
        "text": "백성들이 글을 사용하면서 겪는 어려움을 알아보고 있습니다."
      },
      {
        "speaker": "npc",
        "text": "글이라… 나는 평생 흙을 만지며 살아왔소. 글과는 거리가 먼 사람이오.",
        "expression": "gomin"
      },
      {
        "speaker": "investigator",
        "text": "글을 배우고 싶었던 적은 없으십니까?"
      },
      {
        "speaker": "npc",
        "text": "왜 없겠소. 다만 하루하루 살아가다 보니 뜻대로 되지 않았지.",
        "expression": "gomin"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "label": "어떤 때 글을 알고 싶으셨습니까?",
        "card": 6,
        "lines": [
          {
            "speaker": "investigator",
            "text": "어떤 때 글을 알고 싶으셨습니까?"
          },
          {
            "speaker": "npc",
            "text": "농사일에 도움이 되는 기록이 있다 해도 내가 직접 읽을 수는 없소.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "그럴 때는 어떻게 하십니까?"
          },
          {
            "speaker": "npc",
            "text": "글을 아는 사람을 찾아 읽어 달라고 부탁하지.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "필요한 때마다 도움을 구해야 하니 불편하시겠군요."
          },
          {
            "speaker": "npc",
            "text": "그렇소. 내 일에 필요한 내용인데 내가 직접 알아볼 수 없으니 답답하지.",
            "expression": "gomin"
          }
        ]
      },
      {
        "id": "q2",
        "label": "지금이라도 글을 배우시면 되지 않습니까?",
        "card": null,
        "lines": [
          {
            "speaker": "investigator",
            "text": "지금이라도 글을 배우시면 되지 않습니까?"
          },
          {
            "speaker": "npc",
            "text": "말은 쉽지. 해가 뜨면 밭으로 나가고 해가 지면 지쳐 쓰러지는 게 내 하루요.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "배울 시간이 부족하다는 말씀이군요."
          },
          {
            "speaker": "npc",
            "text": "시간도 부족하고, 글자도 어렵소. 배우려 해도 엄두가 나질 않지.",
            "expression": "gomin"
          },
          {
            "speaker": "investigator",
            "text": "배우고 싶은 마음이 없는 것은 아니시군요."
          },
          {
            "speaker": "npc",
            "text": "그렇소. 배우고 싶지 않은 게 아니라 배우기가 어려운 것이오.",
            "expression": "gomin"
          }
        ]
      },
      {
        "id": "q3",
        "label": "쉽게 배울 수 있는 문자가 있다면 어떻겠습니까?",
        "card": 7,
        "lines": [
          {
            "speaker": "investigator",
            "text": "쉽게 배울 수 있는 문자가 있다면 어떻겠습니까?"
          },
          {
            "speaker": "npc",
            "text": "그런 글자가 있다면 나 같은 사람도 배워 볼 용기가 나겠지.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "농사일을 하면서도 조금씩 익힐 수 있다면 좋겠군요."
          },
          {
            "speaker": "npc",
            "text": "그렇소. 어려운 글을 오래 배우지 않아도 필요한 내용을 읽고 적을 수 있다면 말이오.",
            "expression": "basic"
          },
          {
            "speaker": "investigator",
            "text": "그 말씀을 임금께 전하겠습니다."
          },
          {
            "speaker": "npc",
            "text": "허허, 그런 날이 온다면 내 자식들에게도 글을 가르쳐 주고 싶구려.",
            "expression": "basic"
          }
        ]
      }
    ],
    "prompt": {
      "speaker": "npc",
      "text": "논밭에서 살아가는 내 이야기가 더 궁금하시오?",
      "expression": "basic"
    },
    "ack": {
      "speaker": "npc",
      "text": "바쁜 농사꾼의 사정도 기록해 준다니 든든하구려.",
      "expression": "basic"
    },
    "farewell": {
      "speaker": "npc",
      "text": "나는 다시 논으로 가 봐야겠소. 다른 백성의 이야기도 잘 들어 주시오.",
      "expression": "basic"
    }
  }
};
