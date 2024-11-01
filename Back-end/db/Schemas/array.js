import { Schema, model } from "mongoose";

const ArraySchema = Schema({
  head: {
    type: Array,
  },
  detail: {
    type: Array,
  },
});

const Arrays = model("Array", ArraySchema);

export default Arrays;
