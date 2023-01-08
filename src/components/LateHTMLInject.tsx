import {
  component$,
  useStyles$,
} from "@builder.io/qwik";
import { useResumable } from "./ResumableInjector";

export const LateHTMLInject = component$<{}>(({}) => {
  console.log("[LateHTML]", "html generated");

  const html = useResumable("INCR", { value: 0 });

  useStyles$(`.late-container { padding: 1rem; border-radius: 4px; background-color: salmon; }`)
  return (
    <div style="background: whitesmoke; padding: 1rem">
      LATE HTML INJECT
      <div
        class="late-container"
        dangerouslySetInnerHTML={html}
      />
    </div>
  );
});

export function delay({ ms = 200 } = {}) {
  return new Promise((res) => setTimeout(res, ms));
}
