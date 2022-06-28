class PathRename:
    def __init__(self, field, path, suffix, ext):
        self.field = field
        self.path = path
        self.suffix = suffix
        self.ext = ext

    def __call__(self, instance, filename):
        import os
        #field = getattr(instance, self.field)
        field = self.field
        path = self.path
        suffix = self.suffix
        ext = self.ext

        if ext == "original":
            ext = filename.split('.')[-1]
        else:
            ext = "jpg"
        item_number = 1
        upload_to = f"houses/{instance.house}/{path}"
        filename = '{}_{}_{}.{}'.format(instance.house, suffix, item_number, ext)
        fields = {}
        fields[field] = f"{upload_to}/{filename}"

        Instances = instance.__class__.objects.all()
        try:
            Instance = instance.__class__.objects.get(**fields)
            while Instance in Instances:
                item_number += 1
                filename = '{}_{}_{}.{}'.format(instance.house, suffix, item_number, ext)
                fields[field] = f"{upload_to}/{filename}"
                Instance = instance.__class__.objects.get(**fields)
        except:
            pass

        return os.path.join(upload_to, filename)