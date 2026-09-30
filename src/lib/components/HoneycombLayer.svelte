<!--
	The site's texture: a full-viewport fixed layer behind everything.

	v1 painted this on <main>, so the sidebar inset it and it never covered the
	page. Fixed rather than scrolling on purpose — a honeycomb that moves with the
	content turns into a moiré field on long project pages.
-->
<div
	aria-hidden="true"
	class="pointer-events-none fixed inset-0 -z-10 honeycomb [--c1:var(--honeycomb-ground)] [--c2:var(--honeycomb-cell)] [--s:56px]"
></div>
