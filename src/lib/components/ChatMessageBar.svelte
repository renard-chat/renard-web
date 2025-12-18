<script lang="ts">
	import { onMount } from 'svelte';
	import IconButton from './IconButton.svelte';

	let { class: className = '' } = $props();
	let textarea = $state<HTMLTextAreaElement>();
	const maxLines = 6;
	const lineHeight = 24; // approximate line height in pixels
	const maxHeight = maxLines * lineHeight;

	const handleInput = () => {
		if (textarea) {
			textarea.style.height = 'auto';
			const newHeight = textarea.scrollHeight;

			if (newHeight > maxHeight) {
				textarea.style.height = maxHeight + 'px';
				textarea.style.overflowY = 'auto';
			} else {
				textarea.style.height = newHeight + 'px';
				textarea.style.overflowY = 'hidden';
			}
		}
	};

	let textAreaValue = $state('');

	const handleTextAreaKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault(); // Let IconButton handle the send
		}
	};

	onMount(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Only focus if no modifier keys except shift, and it's a printable character
			if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
				if (textarea && document.activeElement !== textarea) {
					textarea.focus();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div
	class="m-4 flex min-h-12.5 items-center rounded-[25px] bg-home-darker p-2 shadow-lg {className}"
>
	<IconButton icon="plus-circle" shortcut="alt+shift+a" />
	<textarea
		bind:value={textAreaValue}
		bind:this={textarea}
		oninput={handleInput}
		onkeydown={handleTextAreaKeyDown}
		placeholder="Write a message..."
		class="flex-1 resize-none overflow-hidden border-transparent bg-transparent p-0 pr-4 pl-4 text-base text-home-lighter placeholder:text-home-light focus:border-transparent focus:ring-0"
		rows="1"
	></textarea>
	<div class="flex gap-1">
		<IconButton icon={textAreaValue ? 'smiley' : 'sticker'} shortcut="alt+s" />
		<IconButton icon="paper-plane-tilt" primary disabled={!textAreaValue} shortcut="enter" />
	</div>
</div>
