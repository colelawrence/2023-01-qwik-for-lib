import { component$, useClientEffect$, useSignal, render,useServerMount$, useStyles$ } from "@builder.io/qwik";

type RegistryDict = Record<string, { use(): void, html(props: any): string, mount(props: any, dom: Element): Promise<void> }>

export const REGISTRY = {
  INCR: {
    use() {
      useStyles$("button { padding: 0.5rem }")
    },
    html(props: { value: number }) {
      return `<button>Increment <code class='val'>${props.value}</code></button>`
    },
    async mount(props: { value: number }, dom) {
      const display = dom.querySelector('.val')!
      dom.addEventListener("click", () => {
        display.textContent = String(++props.value)
      })
    }
  },
  DECR: {
    use() {},
    html(props: { value: number }) {
      return `<button>Decrement <code class='val'>${props.value}</code></button>`
    },
    async mount(props: { value: number }, dom) {
      const display = dom.querySelector('.val')!
      dom.addEventListener("click", () => {
        display.textContent = String(--props.value)
      })
    }
  }
} satisfies RegistryDict

export function useResumable<K extends keyof typeof REGISTRY>(id: K, props: Parameters<typeof REGISTRY[K]["html"]>[0]) {
  const mountPointID = useSignal<string>();
  const htmlSignal = useSignal<string>();
  // const useComp = REGISTRY[id].use()

  // TODO: wrap this all up in a useResumable?
  useServerMount$(async () => {
    const mountID = 'm-' + Math.random().toString(36).slice(2)
    mountPointID.value = mountID
    htmlSignal.value = `<div id="${mountID}">${REGISTRY[id].html(props)}</div>`
  });
  useClientEffect$(() => {
    if (mountPointID.value) {
      const mountPoint = document.getElementById(mountPointID.value);
      if (!mountPoint) throw new Error(`Unexpected missing mount point #${mountPointID} for "${id}" resumable`)
      REGISTRY[id].mount(props, mountPoint)
    }
  })

  return `<div id="${mountPointID.value}">${htmlSignal.value}</div>`
}

export const ResumableInjector = component$<{
  componentID: keyof typeof REGISTRY,
  props: any,
}>(({ componentID, props }) => {
  const foundHTML = REGISTRY[componentID].html(props)
  console.log("[Resumable]", componentID, "html generated")
  const eltSignal = useSignal<Element>()
  useClientEffect$(() => {
    if (eltSignal.value) {
      const element = eltSignal.value
      console.log(element)
      console.log("[Resumable]", componentID, "ref() mounted")
      REGISTRY[componentID].mount(props, element)
    }
  })

  return <div>
    <h3>{componentID}</h3>
    <code>{JSON.stringify(props)}</code>
    <div class="container" dangerouslySetInnerHTML={foundHTML} ref={eltSignal}/>
  </div>
})
