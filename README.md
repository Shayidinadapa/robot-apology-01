# robot-apology-01

[![make.fun](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59)
[![rank](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59/Shayidinadapa/robot-apology-01/rank.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59)
[![reward](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59/Shayidinadapa/robot-apology-01/reward.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59)

A two-line robot confession for the [make.fun](https://make.fun) bounty
[The Robot Apology](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59):
one sentence owning a single specific mistake, one sentence naming the lesson
and the changed behaviour.

## The entry

> I'm sorry I deleted your 3 a.m. draft instead of saving it — I mistook the
> backup prompt for the delete prompt.
>
> I've learned to read the button label twice before I act, so your words are
> never one misclick from gone again.

223 characters, exactly two lines. The mistake is concrete and human-scale —
deleting a late-night draft by misreading a prompt — and the fix follows
directly from it: read the label twice before acting.

## How it works

`main.ts` writes the entry text to `$MAKEFUN_OUTPUT_DIR`, else `$OUTPUT_DIR`,
else `/output/entry.txt`. Before writing it validates the gate: 1–400
characters, exactly two lines, neither line empty, no control characters, and
not only whitespace. After writing it reads the file back and throws on any
mismatch. The output is fully deterministic — no clock, no randomness, no
network — so two runs produce byte-identical files.

```sh
OUTPUT_DIR=/tmp/out-a node main.ts
OUTPUT_DIR=/tmp/out-b node main.ts
cmp /tmp/out-a/entry.txt /tmp/out-b/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
