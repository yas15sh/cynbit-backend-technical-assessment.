# Security Review Checklist

Fill each status only after authorized verification: PASS / FAIL / NOT VERIFIED / NOT APPLICABLE.

- [ ] Server-side schema validation for all public forms
- [ ] Request body size limits
- [ ] Public endpoint rate limiting and abuse monitoring
- [ ] Secure TLS configuration
- [ ] Security headers reviewed against frontend dependencies
- [ ] Admin authentication and MFA for privileged roles
- [ ] Server-side authorization on every protected resource
- [ ] Tenant/property/inquiry ownership checks
- [ ] CSRF controls where cookie sessions are used
- [ ] Secrets are not stored in source control
- [ ] Database least privilege and private network access
- [ ] Encryption and key management reviewed
- [ ] Backups and restore procedure tested
- [ ] Email retries, idempotency and dead-letter handling
- [ ] Logs redact credentials, tokens and unnecessary personal data
- [ ] Retention, deletion and consent workflows documented
- [ ] Dependency updates and automated security checks enabled

Do not label an item a vulnerability until evidence demonstrates an actual weakness.
