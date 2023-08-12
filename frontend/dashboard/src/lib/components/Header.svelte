<script lang="ts">
    const links = [
        {name: "Brands", link: "/brands", target: "_self"},
        {name: "Categories", link: "/categories", target: "_self"},
    ]
</script>

<header
	class="w-[100vw] bg-black flex justify-center sm:justify-between text-white font-[Vistol] p-[30px] text-[20px]"
>
	<a class="font-[1000] hidden sm:block text-[30px] hover:text-[#20db8f]" href="/">home</a>

	<nav>
		<ul class="m-0 list-none flex gap-[20px]">
			{#each links as link, i}
				<li>
					<a
						class="underline hover:text-[#20DB8F]"
						target={link.target ?? "_blank"}
						href={link.link}
						>{link.name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
