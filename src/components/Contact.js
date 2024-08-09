const Contact = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center m-4 p-4">Contact</h1>
      <form className="text-center">
        <input
          type="text"
          className="border border-black m-2 p-2"
          placeholder="name"
        />
        <input
          type="text"
          className="border border-black m-2 p-2"
          placeholder="message"
        />
        <button className="border border-black bg-black text-white m-2 p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
