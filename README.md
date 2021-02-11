# `react-tinacms-field-condition`

A TinaCMS field suite for making conditional field logic in forms

## Usage

This plugin expects you to already have a working [TinaCMS](https://tinacms.org) project.

### Installing

You can install the plugin package by running:

```
npm install react-tinacms-field-condition
```

### Register Plugin

In your code, register the plugin:

```
import { ConditionalFieldPlugin, ConditionalGroupFieldPlugin } from 'react-tinacms-field-condition'

const cms = new TinaCMS();

cms.plugins.add(ConditionalFieldPlugin);
cms.plugins.add(ConditionalGroupFieldPlugin);
```

### Making A Single Field Conditional

In a [form config](https://tina.io/docs/plugins/forms/), you can use the `condition` field like any other field, providing it a child field to render when its condition returns true.

```
const fields = [
  { name: "type", label: "Type", component: "select", options: ["image", "Video"] }
  { 
    name: "image", 
    label: "Image", 
    component: "condition",
    condition: (value, values) => values.type === "image"
    field: { component: "image" }
  },
  { 
    name: "video", 
    label: "Video", 
    component: "condition",
    condition: (value, values) => values.type === "video"
    field: { component: "video" }
  }
]
```

#### Pro-tips

- The nested field will share the same `name` as the condition field if no `name` is specified for the nested field

### Making Multiple Fields Conditional

In a [form config](https://tina.io/docs/plugins/forms/), you can use the `condition-group` field like any other field, providing it a child fields to render when its condition returns true.

```
const fields = [
  { name: "type", label: "Type", component: "select", options: ["image", "Video"] }
  { 
    name: "image", 
    label: "Image Fields", 
    component: "condition",
    condition: (value, values) => values.type === "image"
    fields: [
      { name: "src", label: "Image", component: "image" },
      { name: "alt", label: "Alternative Text", description: "Displayed if the image fails to load and to screen readers", component: "image" }
    ]
  },
  { 
    name: "video", 
    label: "Video", 
    component: "condition",
    condition: (value, values) => values.type === "video"
    fields: [
      { name: "src", label: "Video", component: "video" },
      { name: "thumbnail", label: "Thumbnail Image", component: "image" }
    ]
  }
]
```

#### Pro-tips

- Unlike the `condition` field, the child fields of a `condition-group` must have their own name. However, the `condition-group` field does _not_ require a `name`.
