import { describe, expect, it } from 'vitest';
import { byDateDescending, loadCollection, slugFromPath } from './collection';
import { postSchema, projectSchema } from './schema';

const valid = {
	title: 'Bone Fracture Detector',
	blurb: 'A ResNet classifier that flags fractures in radiographs.',
	tags: ['ml'],
	tools: ['Python', 'PyTorch'],
	date: '2025-12-07'
};

const mod = (metadata: unknown) => ({ metadata });

describe('slugFromPath', () => {
	it('takes the filename and drops the extension', () => {
		expect(slugFromPath('../../content/projects/booster-tutor.svx')).toBe('booster-tutor');
	});
});

describe('loadCollection', () => {
	it('parses valid frontmatter and attaches the slug', () => {
		const [project] = loadCollection(
			{ '../../content/projects/bone-fracture-detector.svx': mod(valid) },
			projectSchema
		);
		expect(project.slug).toBe('bone-fracture-detector');
		expect(project.title).toBe('Bone Fracture Detector');
	});

	it('defaults images to an empty array so the gallery renders nothing', () => {
		const [project] = loadCollection({ 'a/x.svx': mod(valid) }, projectSchema);
		expect(project.images).toEqual([]);
	});

	it('names the file when a required field is missing', () => {
		const noTitle = { ...valid, title: undefined };
		expect(() => loadCollection({ 'a/no-title.svx': mod(noTitle) }, projectSchema)).toThrow(
			/no-title\.svx/
		);
	});

	it('rejects a tag outside the closed set', () => {
		expect(() =>
			loadCollection({ 'a/x.svx': mod({ ...valid, tags: ['games'] }) }, projectSchema)
		).toThrow(/tags/);
	});

	it('rejects a malformed date', () => {
		expect(() =>
			loadCollection({ 'a/x.svx': mod({ ...valid, date: '7th December' }) }, projectSchema)
		).toThrow(/date/);
	});

	it('rejects a date that looks right but is not real', () => {
		expect(() =>
			loadCollection({ 'a/x.svx': mod({ ...valid, date: '2025-02-31' }) }, projectSchema)
		).toThrow(/date/);
	});

	it('accepts the JS Date that YAML produces for an unquoted frontmatter date', () => {
		const [project] = loadCollection(
			{ 'a/x.svx': mod({ ...valid, date: new Date('2025-12-07T00:00:00.000Z') }) },
			projectSchema
		);
		expect(project.date).toBe('2025-12-07');
	});

	it('accepts the ISO datetime string mdsvex compiles that Date into', () => {
		const [project] = loadCollection(
			{ 'a/x.svx': mod({ ...valid, date: '2025-12-07T00:00:00.000Z' }) },
			projectSchema
		);
		expect(project.date).toBe('2025-12-07');
	});

	it('rejects a repo that is not a URL', () => {
		expect(() =>
			loadCollection({ 'a/x.svx': mod({ ...valid, repo: 'Monowog/thing' }) }, projectSchema)
		).toThrow(/repo/);
	});

	it('accepts the optional credit and report fields', () => {
		const [project] = loadCollection(
			{
				'a/garbage-classifier.svx': mod({
					...valid,
					credit: 'Team project — UC Davis ECS 171',
					report: '/GarbageClassificationReport.pdf'
				})
			},
			projectSchema
		);
		expect(project.credit).toBe('Team project — UC Davis ECS 171');
		expect(project.report).toBe('/GarbageClassificationReport.pdf');
	});

	it('rejects entirely absent frontmatter', () => {
		expect(() => loadCollection({ 'a/x.svx': {} }, projectSchema)).toThrow(/x\.svx/);
	});

	it('refuses two files that would claim the same slug', () => {
		expect(() =>
			loadCollection({ 'a/x.svx': mod(valid), 'b/x.svx': mod(valid) }, projectSchema)
		).toThrow(/Duplicate slug "x"/);
	});
});

describe('postSchema', () => {
	it('defaults tags to empty', () => {
		const [post] = loadCollection(
			{
				'a/rebuilding-bumblebeing.svx': mod({
					title: 'Rebuilding BumbleBeing',
					blurb: 'Forty-one decisions, and the seven I argued against.',
					date: '2026-09-30'
				})
			},
			postSchema
		);
		expect(post.tags).toEqual([]);
	});
});

describe('byDateDescending', () => {
	it('puts the newest entry first', () => {
		const sorted = byDateDescending([
			{ date: '2023-12-07' },
			{ date: '2026-09-22' },
			{ date: '2025-12-07' }
		]);
		expect(sorted.map((entry) => entry.date)).toEqual(['2026-09-22', '2025-12-07', '2023-12-07']);
	});

	it('does not mutate its input', () => {
		const input = [{ date: '2023-01-01' }, { date: '2026-01-01' }];
		byDateDescending(input);
		expect(input[0].date).toBe('2023-01-01');
	});
});
