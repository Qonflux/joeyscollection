import { ref, reactive, watch, nextTick, unref, useSSRContext, mergeProps, computed, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, withAsyncContext } from "vue";
import "hookable";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { u as useFetch } from "./fetch-CLuTBRCt.js";
import "destr";
import "klona";
import "devalue";
import "defu";
import { d as defineStore, _ as _export_sfc } from "../server.mjs";
import "ohash";
import "#internal/nitro";
import "ofetch";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "ufo";
import "@vue/devtools-api";
const state = () => ({
  games: [],
  filteredGames: [],
  hasFiltered: false
});
const getters = {};
const actions = {
  setGames(games) {
    this.games = games;
  },
  setFilteredGames(games) {
    this.games = games;
  },
  setHasFiltered(bool) {
    this.hasFiltered = bool;
  },
  async getAllGames() {
    const { data: games } = await useFetch("/api/games", "$IGrTh3Q0c0");
    return games.value.games;
  },
  async removeFilters() {
    this.hasFiltered = false;
    const games = await this.getAllGames();
    this.setGames(games.value);
  }
};
const UseGameStore = defineStore("gameStore", {
  state,
  getters,
  actions
});
const _sfc_main$3 = {
  __name: "FilterOverlay",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close", "reset-page"],
  setup(__props, { emit: __emit }) {
    const gameStore = UseGameStore();
    const props = __props;
    const search = ref("");
    const genres = reactive({});
    gameStore.games.forEach((game) => {
      game.genres.forEach((genre) => {
        if (!Object.prototype.hasOwnProperty.call(genres, genre))
          genres[genre] = 1;
        else
          genres[genre]++;
      });
    });
    const completed = reactive({});
    gameStore.games.forEach((game) => {
      if (game.completed) {
        if (!Object.prototype.hasOwnProperty.call(completed, "Uitgespeeld"))
          completed["Uitgespeeld"] = 1;
        else
          completed["Uitgespeeld"]++;
      } else {
        if (!Object.prototype.hasOwnProperty.call(completed, "Niet uitgespeeld"))
          completed["Niet uitgespeeld"] = 1;
        else
          completed["Niet uitgespeeld"]++;
      }
    });
    const platforms = reactive({});
    gameStore.games.forEach((game) => {
      if (!Object.prototype.hasOwnProperty.call(platforms, game.platform))
        platforms[game.platform] = 1;
      else
        platforms[game.platform]++;
    });
    const checkedGenres = ref([]);
    const checkedCompleted = ref([]);
    const checkedPlatforms = ref([]);
    const showOverlay = ref(false);
    watch(() => props.show, (newVal) => {
      nextTick(() => {
        if (newVal) {
          showOverlay.value = true;
          toggleHtmlClass("add", "overflow-y-hidden");
        } else {
          toggleHtmlClass("remove", "overflow-y-hidden");
        }
      });
    });
    const toggleHtmlClass = (addRemoveClass, className) => {
      const el = (void 0).documentElement;
      addRemoveClass === "add" ? el.classList.add(className) : el.classList.remove(className);
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="z-50 fixed w-full h-screen flex items-center" style="${ssrRenderStyle({ "background": "rgba(0,0,0,0.5)" })}" data-v-6d06d5d9>`);
          if (unref(showOverlay)) {
            _push2(`<div class="flex flex-col h-screen z-70 shadow-md bg-gray-800 text-sm relative mr-auto w-screen sm:w-100 transform p-4 overflow-y-auto overflow-x-hidden" data-v-6d06d5d9><div class="flex text-lg" data-v-6d06d5d9><h2 data-v-6d06d5d9>Filters</h2><div class="ml-auto cursor-pointer font-bold" data-v-6d06d5d9>X</div></div><hr class="my-3" data-v-6d06d5d9><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Zoeken op naam..." class="rounded-md p-2 text-black" data-v-6d06d5d9><hr class="my-3" data-v-6d06d5d9><h3 data-v-6d06d5d9>Genres</h3><!--[-->`);
            ssrRenderList(unref(genres), (qty, genre) => {
              _push2(`<div class="flex gap-1.5 w-60" data-v-6d06d5d9><input${ssrRenderAttr("id", genre)}${ssrIncludeBooleanAttr(Array.isArray(unref(checkedGenres)) ? ssrLooseContain(unref(checkedGenres), genre) : unref(checkedGenres)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", genre)} data-v-6d06d5d9><label${ssrRenderAttr("for", genre)} class="text-sm" data-v-6d06d5d9>${ssrInterpolate(genre)}</label><br data-v-6d06d5d9><p class="ml-auto text-gray-500" data-v-6d06d5d9>${ssrInterpolate(qty)}</p></div>`);
            });
            _push2(`<!--]--><h3 class="mt-6" data-v-6d06d5d9>Uitgespeeld</h3><!--[-->`);
            ssrRenderList(unref(completed), (qty, complete) => {
              _push2(`<div class="flex gap-1.5 w-40" data-v-6d06d5d9><input${ssrRenderAttr("id", complete)}${ssrIncludeBooleanAttr(Array.isArray(unref(checkedCompleted)) ? ssrLooseContain(unref(checkedCompleted), complete) : unref(checkedCompleted)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", complete)} data-v-6d06d5d9><label${ssrRenderAttr("for", complete)} class="text-sm" data-v-6d06d5d9>${ssrInterpolate(complete)}</label><br data-v-6d06d5d9><p class="ml-auto text-gray-500" data-v-6d06d5d9>${ssrInterpolate(qty)}</p></div>`);
            });
            _push2(`<!--]--><h3 class="mt-6" data-v-6d06d5d9>Platformen</h3><!--[-->`);
            ssrRenderList(unref(platforms), (qty, platform) => {
              _push2(`<div class="flex gap-1.5 w-88" data-v-6d06d5d9><input${ssrRenderAttr("id", platform)}${ssrIncludeBooleanAttr(Array.isArray(unref(checkedPlatforms)) ? ssrLooseContain(unref(checkedPlatforms), platform) : unref(checkedPlatforms)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", platform)} data-v-6d06d5d9><label${ssrRenderAttr("for", platform)} class="text-sm" data-v-6d06d5d9>${ssrInterpolate(platform)}</label><br data-v-6d06d5d9><p class="ml-auto text-gray-500" data-v-6d06d5d9>${ssrInterpolate(qty)}</p></div>`);
            });
            _push2(`<!--]--><button class="bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200" data-v-6d06d5d9> Filters toepassen </button><div class="flex gap-3" data-v-6d06d5d9><button class="bg-gray-600 hover:bg-gray-700 rounded-md font-bold py-2 px-4 transition duration-200 w-full" data-v-6d06d5d9> Kies game! </button><button class="bg-gray-600 hover:bg-gray-700 rounded-md font-bold py-2 px-4 transition duration-200 w-full" data-v-6d06d5d9> Filters verwijderen </button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FilterOverlay.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6d06d5d9"]]);
const _sfc_main$2 = {
  __name: "GamesPaginationButton",
  __ssrInlineRender: true,
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["rounded-md font-bold py-2 px-2.5 sm:px-4 my-3 transition duration-200 text-sm", props.isDisabled ? "bg-violet-800 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-800"]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GamesPaginationButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "GamesPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    numPerPage: {
      type: Number,
      default: 30
    }
  },
  emits: ["next", "prev", "change"],
  setup(__props, { emit: __emit }) {
    const gameStore = UseGameStore();
    const props = __props;
    const emit = __emit;
    const lastPage = computed(() => Math.ceil(gameStore.games.length / props.numPerPage) - 1);
    const prevRange = computed(() => {
      const nums = [];
      let curr = props.currentPage;
      let i = 0;
      while (i < 3 && curr >= 1) {
        if (curr !== props.currentPage)
          nums.push(curr);
        i++;
        curr--;
      }
      return nums.reverse();
    });
    const nextRange = computed(() => {
      const nums = [];
      let curr = props.currentPage;
      let i = 0;
      while (i < 3 && curr < lastPage.value) {
        if (curr !== props.currentPage)
          nums.push(curr);
        i++;
        curr++;
      }
      return nums;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GamesPaginationButton = __nuxt_component_0;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-between" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_GamesPaginationButton, {
        "is-disabled": props.currentPage === 0,
        class: "hidden sm:block",
        onClick: ($event) => emit("prev")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_font_awesome_icon, {
              icon: "fa-solid fa-angle-left",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_font_awesome_icon, {
                icon: "fa-solid fa-angle-left",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex gap-2 mx-auto">`);
      _push(ssrRenderComponent(_component_GamesPaginationButton, {
        "is-disabled": props.currentPage === 0,
        onClick: ($event) => emit("change", 0)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 1 `);
          } else {
            return [
              createTextVNode(" 1 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (props.currentPage > 3) {
        _push(`<p class="mt-auto mb-2.5">...</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(prevRange), (num) => {
        _push(ssrRenderComponent(_component_GamesPaginationButton, {
          key: num,
          "is-disabled": num === props.currentPage,
          onClick: ($event) => emit("change", num)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(num + 1)}`);
            } else {
              return [
                createTextVNode(toDisplayString(num + 1), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.currentPage !== 0 && __props.currentPage !== unref(lastPage)) {
        _push(ssrRenderComponent(_component_GamesPaginationButton, { "is-disabled": "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.currentPage + 1)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.currentPage + 1), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(nextRange), (num) => {
        _push(ssrRenderComponent(_component_GamesPaginationButton, {
          key: num,
          "is-disabled": num === props.currentPage,
          onClick: ($event) => emit("change", num)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(num + 1)}`);
            } else {
              return [
                createTextVNode(toDisplayString(num + 1), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (unref(lastPage) - __props.currentPage > 3) {
        _push(`<p class="mt-auto mb-2.5">...</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_GamesPaginationButton, {
        "is-disabled": props.currentPage === unref(lastPage),
        onClick: ($event) => emit("change", unref(lastPage))
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(lastPage) + 1)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(lastPage) + 1), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_GamesPaginationButton, {
        class: "hidden sm:block",
        "is-disabled": props.currentPage === unref(lastPage),
        onClick: ($event) => emit("next")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_font_awesome_icon, {
              icon: "fa-solid fa-angle-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_font_awesome_icon, {
                icon: "fa-solid fa-angle-right",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GamesPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const gameStore = UseGameStore();
    const games = ([__temp, __restore] = withAsyncContext(() => gameStore.getAllGames()), __temp = await __temp, __restore(), __temp);
    gameStore.setGames(games);
    const openFilters = ref(false);
    const page = ref(0);
    const numPerPage = ref(30);
    const isSortedUp = ref(false);
    const sorting = ref("date");
    const getImage = (platform) => {
      let img = "/images/";
      if (platform === "Nintendo Entertainment System (NES)") {
        img += "nes.png";
      } else if (platform === "Super Nintendo Entertainment System (SNES)") {
        img += "snes.png";
      } else if (platform === "Nintendo 64") {
        img += "n64.png";
      } else if (platform === "Nintendo GameCube") {
        img += "gc.png";
      } else if (platform === "Wii") {
        img += "wii.png";
      } else if (platform === "Wii U") {
        img += "wii-u.png";
      } else if (platform === "Nintendo Switch") {
        img += "switch.png";
      } else if (platform === "Game Boy") {
        img += "gb.png";
      } else if (platform === "Game Boy Color") {
        img += "gbc.png";
      } else if (platform === "Game Boy Advance") {
        img += "gba.png";
      } else if (platform === "Nintendo DS") {
        img += "ds.png";
      } else if (platform === "Nintendo 3DS") {
        img += "3ds.png";
      } else if (platform === "PlayStation") {
        img += "ps.png";
      } else if (platform === "PlayStation 2") {
        img += "ps2.png";
      } else if (platform === "PlayStation 3") {
        img += "ps3.png";
      } else if (platform === "PlayStation 4") {
        img += "ps4.png";
      } else if (platform === "PlayStation 5") {
        img += "ps5.png";
      } else if (platform === "Xbox") {
        img += "xbox.png";
      } else if (platform === "Xbox 360") {
        img += "xbox-360.png";
      } else if (platform === "Xbox One") {
        img += "xbox-one.png";
      } else if (platform === "Xbox Series") {
        img += "xbox-series.png";
      } else {
        img += "md.png";
      }
      return img;
    };
    const sortingValue = computed(() => {
      return sorting.value === "date" ? "Toegevoegd" : "Alfabetisch";
    });
    const gamesArray = computed(() => {
      let games2 = [...gameStore.games];
      if (sorting.value === "alphabet") {
        games2 = games2.sort((a, b) => a.name.localeCompare(b.name));
      }
      const reversedGames = games2.slice().reverse();
      return isSortedUp.value ? reversedGames : games2;
    });
    const previousPage = () => {
      if (page.value !== 0)
        page.value--;
    };
    const nextPage = () => {
      page.value++;
    };
    const toggleSorted = () => {
      isSortedUp.value = !isSortedUp.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_FilterOverlay = __nuxt_component_0$1;
      const _component_font_awesome_layers = resolveComponent("font-awesome-layers");
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_GamesPagination = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-fa7d374b>`);
      _push(ssrRenderComponent(_component_FilterOverlay, {
        show: unref(openFilters),
        onResetPage: ($event) => page.value = 0,
        onClose: ($event) => openFilters.value = false
      }, null, _parent));
      _push(`<div class="flex justify-between text-sm mb-3 whitespace-nowrap" data-v-fa7d374b><div class="text-gray-500 flex items-center" data-v-fa7d374b>${ssrInterpolate((_a = unref(gameStore).games) == null ? void 0 : _a.length)} game`);
      if (((_b = unref(gameStore).games) == null ? void 0 : _b.length) > 1) {
        _push(`<span data-v-fa7d374b>s</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex gap-1 items-center" data-v-fa7d374b> Sorteren: <span class="text-gray-500 cursor-pointer" data-v-fa7d374b>${ssrInterpolate(unref(sortingValue))}</span>`);
      _push(ssrRenderComponent(_component_font_awesome_layers, {
        class: "cursor-pointer",
        onClick: toggleSorted
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fas", "sort-down"],
              class: ["h-4 w-4", { "text-gray-500": unref(isSortedUp) }]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fas", "sort-up"],
              class: ["h-4 w-4", { "text-gray-500": !unref(isSortedUp) }]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_font_awesome_icon, {
                icon: ["fas", "sort-down"],
                class: ["h-4 w-4", { "text-gray-500": unref(isSortedUp) }]
              }, null, 8, ["class"]),
              createVNode(_component_font_awesome_icon, {
                icon: ["fas", "sort-up"],
                class: ["h-4 w-4", { "text-gray-500": !unref(isSortedUp) }]
              }, null, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-1 items-center" data-v-fa7d374b><p class="text-violet-500 cursor-pointer flex gap-1 items-center" data-v-fa7d374b>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: "fa-solid fa-filter",
        class: "h-4 w-4"
      }, null, _parent));
      _push(` <span data-v-fa7d374b>Filters</span></p>`);
      if (unref(gameStore).hasFiltered) {
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: "fa-solid fa-circle-xmark",
          class: "h-4 w-4 text-gray-500 ml-1",
          onClick: ($event) => unref(gameStore).removeFilters()
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-12 gap-4 mb-1" data-v-fa7d374b><!--[-->`);
      ssrRenderList(unref(gamesArray).slice(unref(page) * unref(numPerPage), unref(page) * unref(numPerPage) + unref(numPerPage)), (game) => {
        _push(`<div id="game" class="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2 relative" data-v-fa7d374b><img${ssrRenderAttr("src", game.cover)} class="mx-auto rounded-md transition duration-200 border-2 border-gray-700 h-full" data-v-fa7d374b><div class="info absolute top-4 left-0 opacity-0 transition duration-200 w-full" data-v-fa7d374b><h3 class="text-center" data-v-fa7d374b>${ssrInterpolate(game.name)}</h3><p class="text-center mt-3" data-v-fa7d374b>Release: ${ssrInterpolate(game.releaseDate)}</p><p class="text-center mt-3" data-v-fa7d374b>Platform: <img${ssrRenderAttr("src", getImage(game.platform))} class="inline" data-v-fa7d374b></p><p class="text-center mt-3 flex gap-1 items-center justify-center" data-v-fa7d374b><span data-v-fa7d374b>Uitgespeeld:</span>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: `fa-solid fa-${game.completed ? "check-circle" : "circle-xmark"}`,
          class: ["w-4 h-4", game.completed ? "text-green-500" : "text-red-500"]
        }, null, _parent));
        _push(`</p></div><div class="info absolute bottom-2 left-2 opacity-0 transition duration-200 text-xxs flex gap-2 flex-wrap" data-v-fa7d374b><!--[-->`);
        ssrRenderList(game.genres, (genre) => {
          _push(`<div class="bg-violet-600 pt-1 pb-0.5 px-2 rounded-full" data-v-fa7d374b>${ssrInterpolate(genre)}</div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(gameStore).games.length > unref(numPerPage)) {
        _push(ssrRenderComponent(_component_GamesPagination, {
          "current-page": unref(page),
          "num-per-page": unref(numPerPage),
          "num-games": unref(gameStore).games.length,
          onNext: nextPage,
          onPrev: previousPage,
          onChange: ($event) => page.value = $event
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa7d374b"]]);
export {
  index as default
};
//# sourceMappingURL=index-BM6MYxL1.js.map
