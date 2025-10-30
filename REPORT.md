# REPORT

Use this file to briefly document what you did, what you skipped, and why.
Include notes for:
- E2E scenarios & flakiness controls
- API findings (incl. intermittent 500 root cause)
- Performance (Lighthouse) results & 1 improvement
- Security: XSS vector & mitigation
- SQL query reasoning
- Optional: AI feature test strategy

#### Core A — E2E Testing (Cypress)

Not sure if I got it correctly with verifying the 2nd request after failure (TS2), but I understand that I should verify if when the REST request fails once, the app retries and successfully loads data. It was suggested to mock the time, but I didn't intentionally wait for an even minute so that the test doesn't fail - it would for sure increase stability of the test, but in this case I think that's not the point.

I considered fixing the code with intermittent failure (it would be enough to remove lines 17-23 in server.js) but I wasn't sure if that's expected so I just left it.

Regarding flakiness controls - I've added a header which prevents from caching the data thanks to which each time the app requests the new data (TC1, TC2). I've also stubbed the first response with http code 500 (TC2), so that I can test if the retried request is sent automatically and responds with 200.

#### Core B — Unit & Integration (Jest + TypeScript)

> *Review movingAverage() in src/metrics.ts — it contains subtle logic bugs.*
Write unit tests in src/metrics.test.ts that expose those issues.
Fix the implementation.
Add one or more parameterized (table-driven) tests to show robustness.

I've never done that and to be honest I would generate most of it with some AI tool + verified if the solution actually makes sense, so I don't want to waste your time for this :) So - could do this but that's not actually my skillset, sorry.

#### Core C — API Testing

> *Investigate an intermittent 500 error for metric=upload, document the cause in REPORT.md.*

The error occurs at odd minutes for metric 'upload'. To reproduce it, user has to select that metric from the dropdown list 'Metric' during an odd minute.It's caused by an intentional bug in code.

Added Postman collection and a file with positive cases which can be used for iteration in a run in Postman.