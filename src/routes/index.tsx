import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { LateHTMLInject } from '~/components/LateHTMLInject';
import { ResumableInjector } from '~/components/ResumableInjector';

export default component$(() => {
  return (
    <div>
      <LateHTMLInject />
      <ResumableInjector componentID='INCR' props={{ value: 1 }}/>
      {/* <ResumableInjector componentID='INCR' props={{ value: 2 }}/>
      <ResumableInjector componentID='INCR' props={{ value: 3 }}/>
      <ResumableInjector componentID='DECR' props={{ value: 1 }}/>
      <ResumableInjector componentID='DECR' props={{ value: 2 }}/>
      <ResumableInjector componentID='DECR' props={{ value: 3 }}/> */}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
