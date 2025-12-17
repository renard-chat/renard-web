<script lang="ts">
	import { IconStyle } from "./Icon";

	let {
		icon = 'seal-question',
		color = null,
		style = IconStyle.REGULAR,
		size = '18px',
		class: className = ''
	}: {
		icon: string;
		color?: string | null;
		style?: IconStyle;
		size?: string;
		class?: string
	} = $props();

	const styles: Record<IconStyle, {
    nameOnIcon: string;
    urlParam: string;
  }> = {
		[IconStyle.THIN]: {nameOnIcon: 'ph-thin', urlParam: "thin"},
		[IconStyle.LIGHT]: {nameOnIcon: 'ph-light', urlParam: "light"},
		[IconStyle.REGULAR]: {nameOnIcon: 'ph', urlParam: "regular"},
		[IconStyle.BOLD]: {nameOnIcon: 'ph-bold', urlParam: "bold"},
		[IconStyle.FILL]: {nameOnIcon: 'ph-fill', urlParam: "fill"},
		[IconStyle.DUO]: {nameOnIcon: 'ph-duotone', urlParam: "duotone"}
	};
</script>

<svelte:head>
  <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/{styles[style].urlParam}/style.css"
    />
</svelte:head>
<i
	class="{styles[style].nameOnIcon} ph-{icon} {className}"
	style="{color ? `color: ${color};` : ''}font-size: {size};"
></i>