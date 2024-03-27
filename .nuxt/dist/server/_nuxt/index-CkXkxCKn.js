import { mergeProps, useSSRContext, ref, unref, reactive } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "hookable";
import "#internal/nitro";
import "ofetch";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "klona";
import "ufo";
import "@vue/devtools-api";
import "destr";
import "devalue";
const _sfc_main$2 = {
  props: {
    size: {
      type: [Number, String],
      default: 1.5
    },
    lineSize: {
      type: [Number, String],
      default: 0.25
    },
    lineBgColor: {
      type: String,
      default: "#eee"
    },
    lineFgColor: {
      type: String,
      default: "#7C3AED"
    },
    speed: {
      type: [Number, String],
      default: 0.8
    }
  },
  computed: {
    spinnerStyle() {
      return {
        "margin": "0 auto",
        "border-radius": "100%",
        "border": this.lineSize + "rem solid " + this.lineBgColor,
        "border-top": this.lineSize + "rem solid " + this.lineFgColor,
        "width": this.size + "rem",
        "height": this.size + "rem",
        "animation": "spinner-spin " + this.speed + "s linear infinite"
      };
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "spinner",
    style: $options.spinnerStyle
  }, _attrs))}></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/LoadingSpinner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "GameDetail",
  __ssrInlineRender: true,
  props: {
    game: {
      type: Object,
      required: true
    },
    systems: {
      type: Array,
      required: true
    }
  },
  emits: ["update-platform", "update-completed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const platforms = ref([
      "Nintendo Entertainment System (NES)",
      "Super Nintendo Entertainment System (SNES)",
      "Nintendo 64",
      "Nintendo GameCube",
      "Wii",
      "Wii U",
      "Nintendo Switch",
      "Game Boy",
      "Game Boy Color",
      "Game Boy Advance",
      "Nintendo DS",
      "Nintendo 3DS",
      "PlayStation",
      "PlayStation 2",
      "PlayStation 3",
      "PlayStation 4",
      "Xbox",
      "Xbox 360",
      "Xbox One",
      "Sega Mega Drive"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2>${ssrInterpolate(props.game.name)}</h2><img${ssrRenderAttr("src", props.game.cover)}><p class="mt-3">Release: ${ssrInterpolate(props.game.releaseDate)}</p><p class="mt-3">Genre`);
      if (props.game.genres.length < 1) {
        _push(`<span>s</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`: ${ssrInterpolate(props.game.genres.join(", "))}</p><p class="mt-3">Beschikbaar op: ${ssrInterpolate(props.systems.join(", "))}</p><p class="mt-3 mb-1">Platform:</p><select id="plaform"${ssrRenderAttr("value", props.game.platform)} name="plaform" class="block p-4 pr-8 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-600 focus:border-violet-600"><!--[-->`);
      ssrRenderList(unref(platforms), (platform) => {
        _push(`<option${ssrRenderAttr("value", platform)}>${ssrInterpolate(platform)}</option>`);
      });
      _push(`<!--]--></select><input id="completed"${ssrRenderAttr("value", props.game.completed)} type="checkbox" class="mt-3"><label for="completed" class="text-sm"> Uitgespeeld</label><br><button class="bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200"> Toevoegen </button><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/GameDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const searchTerm = ref("");
    const foundGames = ref([]);
    ref(null);
    ref(null);
    const isLoadingSearch = ref(false);
    const defaultGame = {
      completed: false,
      cover: null,
      genres: [],
      igdbId: null,
      name: null,
      platform: "Nintendo Switch",
      releaseDate: null
    };
    const platforms = ref([]);
    const game = reactive({ ...defaultGame });
    const convertDate = (date) => {
      date = new Date(Number(date * 1e3));
      return date.toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });
    };
    const extractYear = (date) => {
      return date.split("-")[2];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseLoadingSpinner = __nuxt_component_0;
      const _component_AdminGameDetail = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="relative mb-4"><div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"><svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input${ssrRenderAttr("value", unref(searchTerm))} type="search" class="block p-4 pl-10 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-600 focus:border-violet-600" placeholder="Zoek spel"></div>`);
      if (unref(isLoadingSearch)) {
        _push(ssrRenderComponent(_component_BaseLoadingSpinner, {
          size: "3",
          "line-size": "0.375"
        }, null, _parent));
      } else if (unref(foundGames) && unref(foundGames).length > 0 && !unref(game).igdbId) {
        _push(`<div class="text-sm"><h2>Gevonden games:</h2><!--[-->`);
        ssrRenderList(unref(foundGames), (foundGame) => {
          _push(`<a>${ssrInterpolate(foundGame.name)} (${ssrInterpolate(extractYear(convertDate(foundGame.first_release_date)))})<br></a>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(game).igdbId) {
        _push(ssrRenderComponent(_component_AdminGameDetail, {
          game: unref(game),
          systems: unref(platforms),
          class: "mt-4 text-sm",
          onUpdatePlatform: ($event) => unref(game).platform = $event,
          onUpdateCompleted: ($event) => unref(game).completed = !unref(game).completed
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/add/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CkXkxCKn.js.map
