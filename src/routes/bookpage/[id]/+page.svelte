<script lang="ts">
	import { page } from '$app/stores';
	import { db, type Book, type Page } from '$lib/db';
	import { liveQuery } from 'dexie';

	$: pa = $page.params.id;

	$: notes = liveQuery(async () => {
		const nootebook = await db.pages.where('bookId').equals(+pa).toArray();
		return nootebook;
	});

	async function updatePage(item: Page) {
		await db.pages.update(item.id!, item);
	}
</script>

<div class="flex justify-between items-center gap-3 p-2 border-b-2 border-zinc-800">
	<a href="/" class="grid place-content-center p-2 rounded-full border-zinc-800 border-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-5"
		>
			<path d="m12 19-7-7 7-7" />
			<path d="M19 12H5" />
		</svg>
	</a>
	<!-- Nav -->
	<div class="flex justify-between items-center gap-3">
		<button class="grid place-content-center p-2 rounded-md border-zinc-800 border-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-5"
			>
				<path d="M6 8L2 12L6 16" />
				<path d="M2 12H22" />
			</svg>
		</button>

		<p class="grid place-content-center p-1.5 px-4 rounded-md border-zinc-800 border-2">1</p>

		<button class="grid place-content-center p-2 rounded-md border-zinc-800 border-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-5"
			>
				<path d="M18 8L22 12L18 16" />
				<path d="M2 12H22" />
			</svg>
		</button>
	</div>
</div>
<div class="mt-1">
	<div class="flex overflow-x-auto snap-x snap-mandatory">
		<div class="flex gap-6">
			{#if $notes}
				{#each $notes as note (note.id)}
					<div class="w-96 snap-start">
						<div class="p-2">
							<input
								type="text"
								bind:value={note.title}
								on:input={() => {
									updatePage(note);
								}}
								placeholder="Title"
								class="ml-2 bg-transparent w-full border-0 text-2xl border-zinc-800 focus:outline-none placeholder:text-3xl placeholder:dark:text-zinc-600 placeholder:dark:font-semibold"
							/>
						</div>
						<div class="">
							<textarea
								bind:value={note.content}
								on:input={() => {
									updatePage(note);
								}}
								class="w-full h-96 bg-transparent border-0 text-xl text-red-800 focus:outline-none p-1.5 ml-1"
							></textarea>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	textarea {
		background: url('/l2.png') repeat-y;
		width: 100%;
		height: 100%;
		min-height: 80svh;
		line-height: 29px;
		border: solid 1px #ddd;
		background-attachment: local;
	}
</style>
