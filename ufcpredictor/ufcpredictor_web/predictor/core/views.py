from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from .forms import fighterForm

def front(request):

    # end = 249
    
    # url = "https://www.ufc.com/athletes/all?gender=All&amp%3Bpage=2&amp%3Bsearch=&search=&page=1"
    # r = requests.get(url)

    # soup = BeautifulSoup(r.content,"html.parser")

    # # print(soup)

    # names = soup.find_all('span', attrs={'class': 'c-listing-athlete__name'})
    # for name in names:
    #     print(name.text.strip())

    if request.method == 'POST':

        form = fighterForm(request.POST)

        if form.is_valid():
            return middle(request)

    else:
        form = fighterForm()
    
    context = {'form': form}

    return render(request, "front.html", context)

def middle(request):

    return result(request)

def result(request):
    context = {}

    return render(request, "result.html", context)

# @api_view(['GET', 'POST'])
# def note(request):

#     if request.method == 'GET':
#         note = Notes.objects.all()
#         serializer = NoteSerializer(note, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = NoteSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
# def note_detail(request, pk):
#     try:
#         note = Notes.objects.get(pk=pk)
#     except Notes.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'DELETE':
#         note.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)