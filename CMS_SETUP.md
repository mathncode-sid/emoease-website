# Content management handoff

The current launch content is centralised in `app/lib/content.ts` and `app/lib/site-content.ts`. This keeps the public pages ready while a CMS is selected.

For the EmoEase team to edit events, programs, and resources without a developer, connect a headless WordPress installation (the preference recorded in discovery) or another managed CMS before production launch. Configure these content types:

- Events: title, format, date/time, location, description, registration link, published status.
- Programs: title, summary, long description, image, call to action, published status.
- Resources: title, topic, summary, body, reviewed date, published status.

Only designated EmoEase contributors should have CMS accounts. Public visitors do not need accounts.

Before connecting the live CMS, agree who can publish, who reviews clinical/safety content, and how expired event listings are removed.
