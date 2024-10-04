def dots(s):
    res = [s]
    if len(s) <= 1:
        return res
    for i in range(1, len(s)):
        for e in dots(s[i:]):
            res.append(s[:i] + "." + e)
    return res

print(dots("blab"))
