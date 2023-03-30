import React from "react";

function Modal(props) {
  return (
    <Dialog
      className="max-h-screen overflow-auto"
      open={openEdit}
      handler={() => handleOpen("edit")}
      on
      size={"xl"}
    >
      <DialogHeader>Edit Profile Pegawai</DialogHeader>
      <DialogBody divider>
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="my-6 w-96">
              <Input
                type="text"
                name="full_name"
                label="Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-6 w-96">
              <Input
                type="text"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-6 w-96">
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-6 w-96">
              <Input
                type="tel"
                name="phone"
                label="Nomor Hp"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-6 w-96">
              <Select
                label="Jabatan"
                name="job_id"
                value={formData.job_id}
                required
              >
                {jobs.map((job) => {
                  return (
                    <Option
                      onChange={handleJobChange}
                      key={job.id}
                      value={job.id}
                    >
                      {job.job_name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="my-6 flex gap-10">
              <Radio
                id="Laki-laki"
                label="Laki-laki"
                name="gender"
                value="Laki-laki"
                checked={formData.gender === "Laki-laki"}
                onChange={handleGenderChange}
              />
              <Radio
                id="Perempuan"
                label="Perempuan"
                name="gender"
                value="Perempuan"
                checked={formData.gender === "Perempuan"}
                onChange={handleGenderChange}
              />
            </div>
            <div className="my-6 w-96">
              <Textarea
                label="Alamat"
                name="address"
                value={formData.address}
                onChange={handleAddressChange}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default Modal;
