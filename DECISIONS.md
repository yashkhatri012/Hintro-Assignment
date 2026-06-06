# Technical Decisions

## Database Choice

### Decision

MongoDB Atlas

### Why

* Fast setup and cloud hosting.
* Flexible schema.
* Easy storage of nested transcript and citation structures.


### Alternatives Considered

* PostgreSQL
* MySQL

### Trade-offs

Pros:

* Easy schema evolution.

Cons:

* Less strict relational integrity.
* Comparitively harder to maintain in short time without ORMS.

---

## Authentication Strategy

### Decision

JWT Authentication

### Why

* Easy API integration.
* Industry standard approach.

### Alternatives Considered


* OAuth.

### Trade-offs

Pros:

* Scalable.
* No server side session storage.

Cons:

* Token revocation is more difficult.

---

## AI Provider Selection

### Decision

groq llama-3.3-70b-versatile

### Why

* Fast response times.
* Cost efficient.
* Good structured output support.

### Alternatives Considered

* OpenAI GPT models.
* Gemini.

### Trade-offs

Pros:

* Low latency.
* Smart model.

Cons:

* Occasional rate limiting and service unavailability.

---

## Telegram Integration

### Decision

Telegram Bot API

### Why

* Free.
* Easy integration.
* Suitable for reminder delivery.

### Alternatives Considered

* Email.


### Trade-offs

Pros:

* Quick setup.
* Instant notifications.

Cons:

* Requires Telegram account.
* People dont really check telegram.

---

## Project Structure

### Decision

Feature-separated architecture.

controllers/
models/
routes/
services/
middleware/
jobs/
utils/

### Why

* Clear separation of responsibilities.
* Easier maintenance.
* Scales well for new features.

### Trade-offs

Pros:

* Readable structure.
* Easy testing.

Cons:

* More files for small projects.
