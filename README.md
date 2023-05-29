# NSAA DID

Repository: https://github.com/jesusvico/nsaa-did

## 1 Modify create-identifier.ts

```bash
# The -- separator is needed so npm can pass correctly the arguments
npm run id:create -- --alias Jesus
```

## 2 Delete a specific identifier

```bash
# The -- separator is needed so npm can pass correctly the arguments
npm run id:delete -- --alias Jesus
```

## 3 Delete all identifiers

```bash
npm run id:delete-all
```