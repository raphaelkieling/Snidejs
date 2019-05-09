import Snide from "./core/snide";
import * as path from "path";

new Snide()
  .read(path.resolve("example/snide-first.js"))
  .compile()
  .boostrap();
