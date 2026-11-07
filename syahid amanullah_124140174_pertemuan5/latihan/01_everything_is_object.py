"""Di Python semuanya objek: tipe dasar dan fungsi punya tipe, atribut, dan method."""


def sapa():
    return "halo"


for x in (42, 3.14, "teks", [1, 2], sapa):
    print(f"{x!r:<25} type={type(x).__name__:<9} id={id(x)}")

print("Method pada int:", (255).bit_length())
print("Method pada str:", "python".upper())
sapa.keterangan = "fungsi juga bisa diberi atribut"
print(sapa.keterangan)
print("isinstance(5, object):", isinstance(5, object))
