import { a as useRuntimeConfig } from "../server.mjs";
import { u as useFetch } from "./fetch-CLuTBRCt.js";
import { withAsyncContext, ref, computed, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import "#internal/nitro";
import "ofetch";
import "hookable";
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
import "ohash";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { data: games, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.API_URL}/api/games`, { initialCache: false }, "$XFZsyuM5WH")), __temp = await __temp, __restore(), __temp);
    const search = ref("");
    const gamesArray = computed(() => {
      let filtered = games.value;
      if (search.value.length > 0) {
        filtered = filtered.filter((game) => game.name.toLowerCase().includes(search.value.toLowerCase()));
      }
      return filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(_attrs)}><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Zoeken op naam..." class="rounded-md p-2 text-black w-full mb-4"><table class="text-sm"><!--[-->`);
      ssrRenderList(unref(gamesArray), (game, i) => {
        _push(`<tr class="${ssrRenderClass({ "bg-gray-700": i % 2 })}"><td class="w-96">${ssrInterpolate(game.name)}</td><td class="w-80">${ssrInterpolate(game.platform)}</td><td class="w-32"><input type="checkbox"${ssrIncludeBooleanAttr(game.completed) ? " checked" : ""}><button>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: "fa-solid fa-circle-xmark",
          class: "w-4 h-4 text-red-500 ml-4 mb-0.5 cursor-pointer"
        }, null, _parent));
        _push(`</button></td></tr>`);
      });
      _push(`<!--]--></table></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/manage/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-oNSwQe5O.js.map
