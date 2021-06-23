<template>
  <v-card class="editor" height="100%">
    <div class="menu__header">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <v-icon>mdi-format-bold</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <v-icon>mdi-format-italic</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <v-icon>mdi-format-strikethrough</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <v-icon>mdi-format-paragraph</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <v-icon>mdi-format-header-1</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <v-icon>mdi-format-header-2</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <v-icon>mdi-format-header-3</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </button>
          <button class="menubar__button" @click="commands.horizontal_rule">
            <v-icon>mdi-minus</v-icon>
          </button>
          <button class="menubar__button" @click="commands.undo">
            <v-icon>mdi-undo</v-icon>
          </button>
          <button class="menubar__button" @click="commands.redo">
            <v-icon>mdi-redo</v-icon>
          </button>
        </div>
      </editor-menu-bar>
      <div class="search">
        <input
          ref="search"
          class="seach__input"
          @keydown.enter.prevent="editor.commands.find(searchTerm)"
          placeholder="Search …"
          type="text"
          v-model="searchTerm"
        />
        <input
          class="seach__input"
          @keydown.enter.prevent="editor.commands.replace(replaceWith)"
          placeholder="Replace …"
          type="text"
          v-model="replaceWith"
        />
        <button
          class="search__button"
          @click="editor.commands.find(searchTerm)"
        >
          Find
        </button>
        <button class="search__button" @click="editor.commands.clearSearch()">
          Clear
        </button>
        <button
          class="search__button"
          @click="editor.commands.replace(replaceWith)"
        >
          Replace
        </button>
        <button
          class="search__button"
          @click="editor.commands.replaceAll(replaceWith)"
        >
          Replace All
        </button>
      </div>
    </div>
    <v-card-text>
      <editor-content class="editor__content" :editor="editor" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="success" @click="saveTermsAndConditions()">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  Heading,
  OrderedList,
  HorizontalRule,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
  Search
} from "tiptap-extensions";
const axios = require("axios");
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      searchTerm: null,
      replaceWith: null,
      extensions: [
        new HardBreak(),
        new HorizontalRule(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Search({
          disableRegex: false
        })
      ],
      html: "",
      editor: {},
      object: {},
      user: {}
    };
  },
  methods: {
    saveTermsAndConditions() {
      this.object.name = "Reglas de Conducta";
      this.object.status = true;
      this.object.description = this.html;
      axios
        .post("https://firulapp.sodep.com.py/api/param/rules", this.object, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          this.editor = new Editor({
            extensions: this.extensions,
            content: response.data.dto,
            onUpdate: ({ getHTML }) => {
              this.html = getHTML();
            }
          });
          alert("Guardado!");
        });
    }
  },
  mounted() {
    let loggedUser = localStorage.getItem("loggedUser");
    this.user = JSON.parse(loggedUser);
    axios
      .get("https://firulapp.sodep.com.py/api/param/rules/1")
      .then(response => {
        this.object = response.data.dto;
        this.editor = new Editor({
          extensions: this.extensions,
          content: response.data.dto.description,
          onUpdate: ({ getHTML }) => {
            this.html = getHTML();
          }
        });
      })
      .catch(errorResponse => {
        this.object.createdBy = this.user["userId"];
        console.log(errorResponse);
        this.editor = new Editor({
          extensions: this.extensions,
          content: `<h1>Terminos y Condiciones</h1>`,
          onUpdate: ({ getHTML }) => {
            this.html = getHTML();
          }
        });
      });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
.search {
  display: flex;
  flex-wrap: wrap;
  background-color: #00000010;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 1rem 0;
  input {
    padding: 0.25rem;
    border: 0;
    border-radius: px;
    margin-right: 0.5rem;
    font: inherit;
    font-size: 0.8rem;
    width: 20%;
    flex: 1;
    background-color: #ffffff;
  }
}
.menu__header {
  z-index: 100;
  position: fixed;
  padding: 10px;
  height: 7rem;
  background-color: #d3d3d3;
}
.editor__content {
  padding-top: 7rem;
}
.menubar__button,
.search__button {
  font-weight: 700;
  display: inline-flex;
  background: transparent;
  background-color: transparent;
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
.find {
  background: rgba(255, 213, 0, 0.5);
}
.editor {
  max-width: 50rem;
  margin: 0 auto 5rem;
  padding: 2rem;
}
</style>
