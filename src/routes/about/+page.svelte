<script lang="ts">
	import { Separator, Seo } from '$lib/components';

	// One page with three anchored sections rather than v1's three routes, all of
	// which were <span>Hello</span>.
	const sections = [
		{ id: 'education', title: 'Education' },
		{ id: 'experience', title: 'Experience' },
		{ id: 'achievements', title: 'Achievements' },
		{ id: 'hobbies', title: 'Hobbies' }
	];
</script>

<Seo
	title="About"
	description="Jackson Cmelak: education, experience, and what he does when not writing software."
/>

<div class="mx-auto flex w-full max-w-prose flex-col gap-10">
	<header class="flex flex-col gap-3">
		<h1 class="text-center font-display text-3xl font-bold sm:text-4xl">About</h1>
		<nav aria-label="On this page" class="flex flex-wrap justify-center gap-4 text-sm">
			{#each sections as section (section.id)}
				<a href="#{section.id}" class="text-ink-muted underline-offset-4 hover:underline">
					{section.title}
				</a>
			{/each}
		</nav>
	</header>

	<section id="education" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="mb-3 text-center font-display text-2xl font-semibold underline underline-offset-4">
			Education
		</h2>

		<!-- Newest first, the same order the Experience section runs in. Each school's
			dates sit tight under its name, hence the gap-1 pairing. -->
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">University of California, Davis</h3>
					<p class="text-sm text-ink-muted">
						B.S. Computer Science – September 2022 to December 2025
					</p>
				</div>
				<p>
					Most of my focus landed on machine learning and computer architecture, and the courses
					that stuck with me were the ones closest to the machine: data structures and algorithms,
					operating systems, database systems, and scientific computation. Operating systems is
					where I wrote WISH, a Unix-style shell in C that runs external programs with fork and exec
					and handles output redirection, batch mode, and running several commands in parallel. That
					class is a lot of the reason the projects on this site lean toward systems work.
				</p>
				<p>
					Outside of class I spent time with DRAGON, College Bowl trivia, the anime club, and the
					Magic: the Gathering club, the last of which is more or less directly responsible for
					BoosterTutor existing.
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">Diablo Valley College</h3>
					<p class="text-sm text-ink-muted">A.S. Computer Science – August 2019 to June 2022</p>
				</div>
				<p>
					Where I started, and where I learned to actually program. C++ came first and taught me to
					care about what memory is doing, and Java came alongside it, which made object orientation
					click in a way the C++ version of the same lesson had not. The first computer architecture
					coursework happened here too, before I transferred to Davis.
				</p>
			</div>
		</div>
	</section>

	<Separator />

	<section id="experience" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="mb-3 text-center font-display text-2xl font-semibold underline underline-offset-4">
			Experience
		</h2>

		<!-- Newest first by start date, same shape as Education: title, then employer
			and dates, then the prose. -->
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">Freelance Web Developer</h3>
					<p class="text-sm text-ink-muted">Self-employed – December 2025 to present</p>
				</div>
				<p>
					I take production business sites the whole way, from working out what a client actually
					needs through building it in Svelte and TypeScript, testing it, shipping it, and keeping
					it running afterward. The backend side usually means data storage and cloud hosting on
					Zoho Catalyst, wiring up REST APIs and whatever third-party SDKs the job calls for.
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">Summer Event Security Staff</h3>
					<p class="text-sm text-ink-muted">
						Festival of Arts and Pageant of the Masters – June 2023 to August 2024
					</p>
				</div>
				<p>
					Entrances, ticket validation, and crowd control for a high-profile arts venue in Laguna
					Beach, which in practice meant helping several hundred guests a night find where they were
					going without any of it feeling like security. Not a programming job, but good practice at
					the part of this work that is really about people.
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">Data Analyst Intern</h3>
					<p class="text-sm text-ink-muted">US Cryotherapy – June 2022 to August 2022</p>
				</div>
				<p>
					The data was spread across a point of sale system, ActiveCampaign, Google, and a handful
					of social platforms, so a good chunk of the job was just getting five years of it into one
					place I could reason about. I built statistical models in Python on top of that and spent
					the rest of my time asking people around the company what the numbers actually meant. It
					ended with a full-day workshop where I presented to ownership and management, and they
					built the next year's advertising strategy around what I found. That was the first time I
					watched something I wrote in a notebook change what a business actually did.
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">Cryotherapy Technician</h3>
					<p class="text-sm text-ink-muted">US Cryotherapy – October 2018 to July 2022</p>
				</div>
				<p>
					Nearly four years on the floor, through the end of high school and most of college. It is
					also why the internship worked: I already knew how the business ran, so the numbers had
					something to attach to.
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-xl font-semibold">Robotics Programmer</h3>
					<p class="text-sm text-ink-muted">
						FIRST Team 1458, Red Tie Robotics – November 2015 to April 2017
					</p>
				</div>
				<p>
					Where the whole thing started. I wrote movement and vision code in Java and OpenCV for two
					competition seasons, which is the first time I had to make software work on a deadline
					with a physical machine on the other end of it.
				</p>
			</div>
		</div>
	</section>

	<Separator />

	<section id="achievements" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="mb-3 text-center font-display text-2xl font-semibold underline underline-offset-4">
			Achievements
		</h2>
		<ul class="list-disc space-y-2 ps-5">
			<li>Eagle Scout, Troop 36 in Danville, California.</li>
			<li>
				Competitive Magic: the Gathering player, with over $20,000 won in cash and product prizing.
			</li>
			<li>
				Regular Red Cross blood donor, giving double red cell (2RBC) donations three times a year.
			</li>
		</ul>
	</section>

	<Separator />

	<section id="hobbies" class="flex scroll-mt-20 flex-col gap-3">
		<h2 class="mb-3 text-center font-display text-2xl font-semibold underline underline-offset-4">
			Hobbies
		</h2>
		<p>
			I design and build board and card games. Multi-Task King came out of that, a digital port of a
			physical game I made about how dopaminergic stimuli, the endless scroll and the short-form
			video and everything like it, get in the way of a life you actually want. DNDIgor came out of
			the same impulse from a different angle, a Discord bot in Node.js and SQLite that keeps track
			of characters, items, spells, and parties so nobody has to be the one with the spreadsheet.
		</p>
		<p>
			Away from a keyboard I play bass guitar, draft a fair amount of Magic, and watch an
			indefensible number of video essays.
		</p>
	</section>
</div>
