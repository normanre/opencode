# normanre patches

`../normanre.patch` contains only the changes from the 12 requested commits
from `dev_normanre`. It is a plain unified diff, so it can be applied to the
working tree without creating commits.

The series has been rebased onto the current `dev` commit and its patch
commits therefore have new IDs; the original source IDs are listed below.

```powershell
git switch dev
git pull --ff-only origin dev
git apply --3way patches/normanre.patch
```

The same command works from a POSIX shell. If a newer `dev` change conflicts,
resolve the conflict in the working tree and run `git apply --continue` where
supported, or apply the remaining hunks manually.

Included commits:

1. `a27488dfe94b67dae345d3ad464fea66e025fcc7`
2. `246ac9217f33077f166319688cb0a5a90b5ce7a3`
3. `c2c864e0fd8a3f64b91b9966d041d6986e9b8f0d`
4. `186cbe28eb96bb5eafffdcc314f48605b5d4bfb8`
5. `3608473db75557c0b330db57d934b9ebbad87df9`
6. `5e437e4b10f5beea2c594336f87d208f277427fb`
7. `24dd910009134059511fa307d78697a4a77dda1e`
8. `187f2c12371548507d0191d24215d82e009e7f1f`
9. `5f7f2a4e36343b839f7b039cd75a36ad6c99ed07`
10. `ded130d84b006b905d5e79f470ebe2b984bb45a7`
11. `9f341a9d3a8ffad00fb71639c9f4dd126b5e46a9`
12. `f97653be792a94405a4a0efb8e164fdd8322ea0c`
