def all_possible_dots(string):
    res = []

    def put_dots(original_string, dots_to_put):
        if dots_to_put == 0:
            return [original_string]

        new_res = []
        for places_for_dot in range(len(original_string) - dots_to_put):
            base_string = original_string[:places_for_dot + 1] + '.'
            dot_res = put_dots(
                original_string[places_for_dot + 1:], dots_to_put - 1)
            for r in dot_res:
                new_res = new_res + [base_string + r]
        return new_res

    for dots_amount in range(len(string)):
        res = res + put_dots(string, dots_amount)
    return res


print(all_possible_dots('abcdefghkl'))
